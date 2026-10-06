import { reducedMotion } from '../config/motion';
export function initHero(): void {
  const hero=document.querySelector<HTMLElement>('.cyber-hero'),button=document.querySelector<HTMLButtonElement>('#hero-motion');
  if(!hero||!button)return;
  let visible=false,paused=reducedMotion.matches;
  const sync=():void=>{hero.classList.toggle('hero-animating',visible&&!paused&&!document.hidden&&!reducedMotion.matches);button.setAttribute('aria-pressed',String(paused));button.textContent=paused?'[ PLAY ANIMATION ]':'[ PAUSE ANIMATION ]';};
  if(reducedMotion.matches){button.disabled=true;button.textContent='[ REDUCED MOTION ]';return;}
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.05}).observe(hero);
  button.addEventListener('click',()=>{paused=!paused;sync();});
  document.addEventListener('visibilitychange',sync);
}
