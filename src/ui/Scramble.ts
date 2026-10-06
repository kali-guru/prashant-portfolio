import { motion } from '../config/motion';
export function initScramble(reduced: boolean): void {
  if (reduced || motion.intensity === 'subtle') return;
  const observer = new IntersectionObserver(entries => {for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    observer.unobserve(entry.target);
    const node = entry.target as HTMLElement, text = node.dataset.scramble || node.textContent || '';
    node.setAttribute('aria-label', text);
    const output = new Array<string>(text.length).fill(' '); const start = performance.now();
    const timer = window.setInterval(() => {
      const p = Math.min(1, (performance.now() - start) / motion.scramble.duration);
      for (let i = 0; i < text.length; i++) output[i] = i < p * text.length || text[i] === ' ' ? text[i] : motion.scramble.charset[Math.floor(Math.random() * motion.scramble.charset.length)];
      node.textContent = output.join('');
      if (p >= 1) {node.textContent = text; clearInterval(timer);}
    }, motion.scramble.interval);
  }}, {threshold: .5});
  document.querySelectorAll('[data-scramble]').forEach(el => observer.observe(el));
}
