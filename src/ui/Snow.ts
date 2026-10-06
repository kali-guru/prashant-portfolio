import { desktop, motion } from '../config/motion';
import type { ScrollJourney } from './ScrollJourney';
export function initSnow(engine: ScrollJourney): void {
  const canvas = document.querySelector<HTMLCanvasElement>('#snow');
  if (!canvas || engine.reduced || !motion.snow.enabled || motion.intensity !== 'full' || !desktop.matches) return;
  const ctx = canvas.getContext('2d'); if (!ctx) return;
  const count = motion.snow.count, particles = new Float32Array(count * 4);
  let width = 1, height = 1;
  const resize = (): void => {const rect = canvas.getBoundingClientRect(); width = rect.width; height = rect.height; const dpr = Math.min(devicePixelRatio, 2); canvas.width = width * dpr; canvas.height = height * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);};
  resize(); new ResizeObserver(resize).observe(canvas);
  for (let i = 0; i < count; i++) {const j = i * 4; particles[j] = Math.random(); particles[j + 1] = Math.random(); particles[j + 2] = motion.snow.minSpeed + Math.random() * (motion.snow.maxSpeed - motion.snow.minSpeed); particles[j + 3] = .5 + Math.random() * 1.3;}
  const hero = engine.sections.find(s => s.el.id === 'top')!;
  engine.add((time, dt) => {
    if (!hero.active || hero.p >= .5 || !desktop.matches) {canvas.style.opacity = '0'; return false;}
    canvas.style.opacity = String((1 - hero.p * 2) * .6); ctx.clearRect(0, 0, width, height); ctx.fillStyle = '#dbeefa';
    for (let i = 0; i < count; i++) {const j = i * 4; particles[j + 1] += particles[j + 2] * dt / 1000 / height; if (particles[j + 1] > 1) particles[j + 1] = 0; ctx.beginPath(); ctx.arc(particles[j] * width + Math.sin(time * .0003 + i) * 15, particles[j + 1] * height, particles[j + 3], 0, Math.PI * 2); ctx.fill();}
    return true;
  });
}
