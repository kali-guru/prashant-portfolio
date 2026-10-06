import { motion } from '../config/motion';
export function initReveal(reduced: boolean): void {
  const nodes = document.querySelectorAll<HTMLElement>('.reveal,.footer-wordmark');
  const observer = new IntersectionObserver(entries => {for (const entry of entries) if (entry.isIntersecting) {(entry.target as HTMLElement).classList.add('visible'); observer.unobserve(entry.target);}}, {threshold: .12});
  nodes.forEach((node, i) => {node.style.setProperty('--delay', (i % 3) * motion.stagger.rows + 'ms'); if (reduced) node.classList.add('visible'); else observer.observe(node);});
  document.querySelectorAll<HTMLElement>('.footer-wordmark span').forEach((el, i) => el.style.setProperty('--i', String(i)));
}
