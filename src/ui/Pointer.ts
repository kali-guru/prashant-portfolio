import { desktop, motion } from '../config/motion';
import type { ScrollJourney } from './ScrollJourney';
export function initPointer(engine: ScrollJourney): void {
  if (engine.reduced || !motion.pointer.enabled || motion.intensity !== 'full' || !desktop.matches) return;
  let tx = 0, ty = 0, x = 0, y = 0;
  const hero = document.querySelector<HTMLElement>('#top')!;
  const root = document.documentElement.style;
  hero.addEventListener('pointermove', e => {tx = e.clientX / window.innerWidth * 2 - 1; ty = e.clientY / window.innerHeight * 2 - 1; engine.wake();}, {passive: true});
  hero.addEventListener('pointerleave', () => {tx = 0; ty = 0; engine.wake();});
  engine.add(() => {x += (tx - x) * motion.pointer.smoothing; y += (ty - y) * motion.pointer.smoothing; root.setProperty('--px', x.toFixed(4)); root.setProperty('--py', y.toFixed(4)); return Math.abs(tx - x) + Math.abs(ty - y) > .001;});
  document.querySelectorAll<HTMLElement>('.project-frame,.magnetic').forEach(el => {
    let rect = el.getBoundingClientRect();
    el.addEventListener('pointerenter', () => {rect = el.getBoundingClientRect();});
    el.addEventListener('pointermove', e => {const px = (e.clientX - rect.left) / rect.width * 2 - 1, py = (e.clientY - rect.top) / rect.height * 2 - 1; el.style.transform = el.classList.contains('magnetic') ? 'translate(' + px * motion.pointer.magnetic + 'px,' + py * motion.pointer.magnetic + 'px)' : 'perspective(800px) rotateX(' + -py * motion.pointer.tilt + 'deg) rotateY(' + px * motion.pointer.tilt + 'deg)';}, {passive: true});
    el.addEventListener('pointerleave', () => {el.style.transform = '';});
  });
}
