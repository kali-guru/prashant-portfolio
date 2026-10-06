import { motion, expoOut } from '../config/motion';
import type { ScrollJourney } from './ScrollJourney';
export function initCounters(engine: ScrollJourney): void {
  if (engine.reduced || motion.intensity === 'subtle') return;
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-count]')).map(el => ({el, value: Number(el.dataset.count), start: -1, done: false, padded: el.classList.contains('slab-number')}));
  const observer = new IntersectionObserver(entries => {for (const entry of entries) if (entry.isIntersecting) {const item = items.find(x => x.el === entry.target); if (item) item.start = performance.now(); observer.unobserve(entry.target); engine.wake();}}, {threshold: .3});
  items.forEach(item => observer.observe(item.el));
  engine.add(time => {let busy = false; for (let i = 0; i < items.length; i++) {const item = items[i]; if (item.done || item.start < 0) continue; const p = Math.min(1, (time - item.start) / (item.padded ? 600 : motion.counter.duration)); const text = String(Math.round(expoOut(p) * item.value)); item.el.textContent = item.padded ? text.padStart(2, '0') : text; item.done = p >= 1; if (!item.done) busy = true;} return busy;});
}
