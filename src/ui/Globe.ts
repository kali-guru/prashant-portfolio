import { worldLand } from '../config/worldLand';
import { clamp, motion } from '../config/motion';
import type { ScrollJourney } from './ScrollJourney';

export function initGlobe(engine: ScrollJourney): void {
  const canvas = document.querySelector<HTMLCanvasElement>('#globe');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const wrap = canvas.parentElement!;
  const latitudes = 7, longitudes = 37;
  const points = new Float32Array(latitudes * longitudes * 3);
  const projected = new Float32Array(points.length);
  let index = 0;
  for (let row = 0; row < latitudes; row++) {
    const latitude = (-90 + row * 30) * Math.PI / 180;
    for (let col = 0; col < longitudes; col++) {
      const longitude = col * 10 * Math.PI / 180;
      points[index++] = Math.cos(latitude) * Math.sin(longitude);
      points[index++] = Math.sin(latitude);
      points[index++] = Math.cos(latitude) * Math.cos(longitude);
    }
  }
  const latitude = 27.7172 * Math.PI / 180, longitude = 85.324 * Math.PI / 180;
  const markerX = Math.cos(latitude) * Math.sin(longitude), markerY = Math.sin(latitude), markerZ = Math.cos(latitude) * Math.cos(longitude);
  let width = 1, height = 1, radius = 1, yaw = longitude, pitch = -.12;
  let active = false, needsDraw = true, dragging = false, lastX = 0, lastY = 0, velocity = 0;
  const animated = !engine.reduced && motion.intensity !== 'subtle';
  const resize = (): void => {
    const rect = wrap.getBoundingClientRect(); width = rect.width; height = rect.height;
    radius = Math.min(width, height) * .39;
    const dpr = Math.min(devicePixelRatio || 1, motion.globe.maxDpr);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); needsDraw = true; engine.wake();
  };
  wrap.classList.add('globe-ready'); resize();
  new ResizeObserver(resize).observe(wrap);
  new IntersectionObserver(entries => {active = entries[0].isIntersecting; if (active) {needsDraw = true; engine.wake();}}, {threshold: .05}).observe(wrap);
  if (animated) {
    canvas.addEventListener('pointerdown', event => {dragging = true; lastX = event.clientX; lastY = event.clientY; velocity = 0; canvas.setPointerCapture(event.pointerId); engine.wake();});
    canvas.addEventListener('pointermove', event => {
      if (!dragging) return;
      velocity = -(event.clientX - lastX) * .006;
      yaw += velocity; pitch = clamp(pitch + (event.clientY - lastY) * .003, -.75, .75);
      lastX = event.clientX; lastY = event.clientY; needsDraw = true; engine.wake();
    });
    const release = (): void => {dragging = false; engine.wake();};
    canvas.addEventListener('pointerup', release); canvas.addEventListener('pointercancel', release); canvas.addEventListener('lostpointercapture', release);
  }
  canvas.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'ArrowLeft') yaw -= motion.globe.keyboardStep;
    if (event.key === 'ArrowRight') yaw += motion.globe.keyboardStep;
    if (event.key === 'ArrowUp') pitch = clamp(pitch - motion.globe.keyboardStep, -.75, .75);
    if (event.key === 'ArrowDown') pitch = clamp(pitch + motion.globe.keyboardStep, -.75, .75);
    velocity = 0; needsDraw = true; engine.wake();
  });
  engine.add((_time, dt) => {
    if (!active || (!needsDraw && Math.abs(velocity) < .0005)) return false;
    if (animated && !dragging) {
      yaw += velocity * dt / 16.67; velocity *= Math.pow(motion.globe.damping, dt / 16.67);
      if (Math.abs(velocity) < .0005) velocity = 0;
    }
    const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    const centerX = width * .5, centerY = height * .46;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#10202b'; ctx.beginPath(); ctx.arc(centerX, centerY, radius, 0, Math.PI * 2); ctx.fill();
    for (let i = 0; i < points.length; i += 3) {
      const x = points[i] * cy - points[i + 2] * sy;
      const z = points[i] * sy + points[i + 2] * cy;
      const y = points[i + 1] * cp - z * sp;
      projected[i] = centerX + x * radius;
      projected[i + 1] = centerY - y * radius;
      projected[i + 2] = points[i + 1] * sp + z * cp;
    }
    ctx.lineWidth = .65;
    // Separate front/back paths keep the wireframe readable without per-frame arrays.
    for (let front = 0; front < 2; front++) {
      ctx.strokeStyle = front ? '#6d8fa13d' : '#4f677212'; ctx.beginPath();
      for (let row = 1; row < latitudes - 1; row++) for (let col = 1; col < longitudes; col++) {
        const i = (row * longitudes + col) * 3, previous = i - 3;
        if ((projected[i + 2] >= 0) === !!front) {ctx.moveTo(projected[previous], projected[previous + 1]); ctx.lineTo(projected[i], projected[i + 1]);}
      }
      for (let col = 0; col < longitudes - 1; col += 3) for (let row = 1; row < latitudes; row++) {
        const i = (row * longitudes + col) * 3, previous = i - longitudes * 3;
        if ((projected[i + 2] >= 0) === !!front) {ctx.moveTo(projected[previous], projected[previous + 1]); ctx.lineTo(projected[i], projected[i + 1]);}
      }
      ctx.stroke();
    }
    ctx.fillStyle = '#9fc9df'; ctx.beginPath();
    for (let i = 0; i < worldLand.length; i += 3) {
      const x = worldLand[i] * cy - worldLand[i + 2] * sy;
      const z = worldLand[i] * sy + worldLand[i + 2] * cy;
      const y = worldLand[i + 1] * cp - z * sp;
      if (worldLand[i + 1] * sp + z * cp <= .02) continue;
      const px = centerX + x * radius, py = centerY - y * radius;
      const dot = Math.max(.8, radius * .009);
      ctx.moveTo(px + dot, py); ctx.arc(px, py, dot, 0, Math.PI * 2);
    }
    ctx.fill();
    ctx.strokeStyle = '#a9ccdf60'; ctx.beginPath(); ctx.arc(centerX, centerY, radius, 0, Math.PI * 2); ctx.stroke();
    const mx = markerX * cy - markerZ * sy, mz = markerX * sy + markerZ * cy;
    const my = markerY * cp - mz * sp, depth = markerY * sp + mz * cp;
    if (depth > .3) {
      const px = centerX + mx * radius, py = centerY - my * radius;
      const pulse = 0;
      ctx.fillStyle = '#b6e0ff'; ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = .6 * (1 - pulse); ctx.strokeStyle = '#9fd3ff'; ctx.beginPath(); ctx.arc(px, py, 6 + pulse * 10, 0, Math.PI * 2); ctx.stroke(); ctx.globalAlpha = 1;
      ctx.font = '10px "JetBrains Mono", monospace';
      const labelX = Math.min(px + 13, width - 90);
      ctx.fillStyle = '#0b0d10'; ctx.fillRect(labelX - 4, py - 10, 88, 20);
      ctx.fillStyle = '#e1f1fc'; ctx.fillText('KATHMANDU', labelX, py + 3);
    }
    needsDraw = false;
    return animated && !dragging && Math.abs(velocity) >= .0005;
  });
}
