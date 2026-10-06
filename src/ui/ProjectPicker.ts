import { clamp, desktop, motion } from '../config/motion';
import type { ScrollJourney } from './ScrollJourney';
export function initProjectPicker(engine: ScrollJourney): void {
  const list = document.querySelector<HTMLElement>('.project-picker'); if (!list) return;
  const items = Array.from(list.querySelectorAll<HTMLElement>('li'));
  const links = items.map(item => item.querySelector<HTMLAnchorElement>('a')!);
  const meta = document.querySelector<HTMLElement>('#archive-meta');
  const section = engine.sections.find(s => s.el.id === 'archive');
  let override = -1, value = 0, last = -1;
  items.forEach((item, i) => {
    item.addEventListener('mouseenter', () => {override = i; engine.wake();});
    item.addEventListener('focusin', () => {override = i; engine.wake();});
  });
  list.addEventListener('mouseleave', () => {if (!list.contains(document.activeElement)) {override = -1; engine.wake();}});
  list.addEventListener('focusout', e => {if (!list.contains(e.relatedTarget as Node)) {override = -1; engine.wake();}});
  list.addEventListener('keydown', e => {if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return; e.preventDefault(); const index = links.indexOf(document.activeElement as HTMLAnchorElement); override = clamp(index + (e.key === 'ArrowDown' ? 1 : -1), 0, items.length - 1); links[override].focus(); engine.wake();});
  engine.add(() => {
    if (!section?.active) return false;
    const target = override >= 0 ? override : section.p * (items.length - 1);
    value = engine.reduced ? target : value + (target - value) * motion.archive.smoothing;
    const active = Math.round(value);
    if (active !== last) {
      items.forEach((item, i) => item.classList.toggle('active', i === active));
      if (meta) meta.textContent = items[active].dataset.meta + ' / Year TBD';
      last = active;
    }
    if (desktop.matches && !engine.reduced && motion.intensity !== 'subtle') {
      for (let i = 0; i < items.length; i++) {
        const d = Math.abs(i - value), capped = Math.min(d, 4);
        items[i].style.opacity = Math.max(.15, 1 - motion.archive.opacityFalloff * d).toFixed(3);
        items[i].style.transform = 'translateX(' + (i === active ? -10 : motion.archive.offset * capped).toFixed(2) + 'px) scale(' + (1 - motion.archive.scaleFalloff * capped).toFixed(3) + ')';
        items[i].style.filter = 'blur(' + (motion.archive.blur * Math.min(d, 3)).toFixed(2) + 'px)';
      }
    }
    return Math.abs(value - target) > .001;
  });
}
