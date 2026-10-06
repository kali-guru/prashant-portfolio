import { reducedMotion } from '../config/motion';
export function initDepth(): void {
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  if (reducedMotion.matches || !fine.matches) return;
  document.querySelectorAll<HTMLElement>('[data-depth]').forEach(el => {
    let rect: DOMRect | null = null;
    const reset = (): void => { el.style.setProperty('--tilt-x','0deg'); el.style.setProperty('--tilt-y','0deg'); };
    el.addEventListener('pointerenter', () => {rect = el.getBoundingClientRect();});
    el.addEventListener('pointermove', event => {
      if (!rect || document.documentElement.classList.contains('motion-paused')) return;
      const x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
      const y = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
      el.style.setProperty('--tilt-x',(-y * 5).toFixed(2)+'deg'); el.style.setProperty('--tilt-y',(x * 7).toFixed(2)+'deg');
    }, {passive:true});
    el.addEventListener('pointerleave',reset);
    document.addEventListener('portfolio-motion-change',reset);
  });
}
