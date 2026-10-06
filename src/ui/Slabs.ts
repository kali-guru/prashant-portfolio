import { motion } from '../config/motion';
export function initSlabs(reduced: boolean): void {
  if (reduced) return;
  const observer = new IntersectionObserver(entries => {for (const entry of entries) if (entry.isIntersecting) {
    const slab = entry.target as HTMLElement;
    slab.classList.add('entered'); observer.unobserve(slab);
  }}, {threshold: .12});
  document.querySelectorAll<HTMLElement>('.slab-inner').forEach(el => {
    const title = el.querySelector<HTMLElement>('.slab-title');
    if (title) title.style.setProperty('--title-delay', motion.slabs.titleDelay + 'ms');
    observer.observe(el);
  });
}
