import { motion, expoOut } from '../config/motion';
import type { ScrollJourney } from './ScrollJourney';
export function initIntro(engine: ScrollJourney): void {
  if (engine.reduced || !motion.intro.enabled || motion.intensity !== 'full' || location.hash || window.scrollY > 0) return;
  try {if (sessionStorage.getItem('altitude-intro')) return; sessionStorage.setItem('altitude-intro', '1');} catch { /* Storage is optional. */ }
  const overlay = document.createElement('div'); overlay.className = 'intro'; overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = '<span class="intro-count">[ 000 ]</span><span class="intro-bar"><i></i></span>';
  document.body.append(overlay); document.body.classList.add('intro-playing');
  const count = overlay.querySelector<HTMLElement>('.intro-count')!;
  const started = performance.now(); let finished = false;
  const finish = (): void => {if (finished) return; finished = true; overlay.classList.add('done'); document.body.classList.remove('intro-playing'); document.body.classList.add('hero-enter'); window.setTimeout(() => {overlay.remove(); document.body.classList.remove('hero-enter');}, motion.intro.curtain + motion.duration.cinematic);};
  // A failsafe also covers background tabs and interrupted rendering.
  window.setTimeout(finish, motion.intro.counter + 500);
  engine.add(time => {if (finished) return false; const p = Math.min(1, (time - started) / motion.intro.counter); count.textContent = '[ ' + Math.round(expoOut(p) * 100).toString().padStart(3, '0') + ' ]'; overlay.style.setProperty('--intro-p', expoOut(p).toFixed(4)); if (p >= 1) finish(); return !finished;});
}
