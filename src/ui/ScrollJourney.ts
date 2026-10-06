import { clamp, range, expoOut, motion, reducedMotion } from '../config/motion';
export type Tick = (time: number, delta: number) => boolean;
export interface JourneySection { el: HTMLElement; top: number; height: number; p: number; active: boolean; sticky: boolean; rgb: number[]; }
export class ScrollJourney {
  readonly sections: JourneySection[];
  readonly reduced = reducedMotion.matches;
  y = 0;
  pageProgress = 0;
  zone = 'GROUND';
  private clients: Tick[] = [];
  private raf = 0;
  private dirty = true;
  private previousTime = 0;
  private maxScroll = 1;
  private viewport = window.innerHeight;
  private gauge = document.querySelector<HTMLElement>('.altimeter');
  private lastZone = -1;
  private lines = Array.from(document.querySelectorAll<HTMLElement>('.manifesto h2>span'));
  constructor() {
    this.sections = Array.from(document.querySelectorAll<HTMLElement>('.journey')).map(el => {
      const hex = el.dataset.color || '#0B0D10';
      return {el, top: 0, height: 0, p: 0, active: false, sticky: false, rgb: [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)]};
    });
    this.measure();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const item = this.sections.find(s => s.el === entry.target);
        if (item) { item.active = entry.isIntersecting; item.el.classList.toggle('active', item.active); }
      }
      this.dirty = true; this.wake();
    }, {rootMargin: motion.scroll.nearMargin});
    this.sections.forEach(item => observer.observe(item.el));
    new ResizeObserver(() => {this.measure(); this.dirty = true; this.wake();}).observe(document.body);
    window.addEventListener('resize', () => {this.measure(); this.dirty = true; this.wake();}, {passive: true});
    window.addEventListener('scroll', () => {this.dirty = true; this.wake();}, {passive: true});
    document.addEventListener('visibilitychange', () => {if (document.hidden) {cancelAnimationFrame(this.raf); this.raf = 0;} else {this.previousTime = 0; this.dirty = true; this.wake();}});
    document.fonts.ready.then(() => {this.measure(); this.dirty = true; this.wake();});
    this.wake();
  }
  add(tick: Tick): void {this.clients.push(tick); this.wake();}
  wake = (): void => {if (!this.raf && !document.hidden) this.raf = requestAnimationFrame(this.frame);};
  private measure(): void {
    const scroll = window.scrollY;
    this.viewport = window.innerHeight;
    this.maxScroll = Math.max(1, document.documentElement.scrollHeight - this.viewport);
    for (const section of this.sections) {
      const rect = section.el.getBoundingClientRect();
      section.top = rect.top + scroll; section.height = rect.height;
      const child = section.el.querySelector<HTMLElement>(':scope > .sticky');
      section.sticky = !!child && getComputedStyle(child).position === 'sticky';
    }
  }
  private frame = (time: number): void => {
    this.raf = 0;
    const dt = Math.min(50, this.previousTime ? time - this.previousTime : 16.67);
    this.previousTime = time;
    let moving = false;
    this.y = window.scrollY;
    this.pageProgress = clamp(this.y / this.maxScroll);
    if (this.dirty) {
      let zoneIndex = 0;
      for (let i = 0; i < this.sections.length; i++) {
        const s = this.sections[i];
        if (this.y + this.viewport * .45 >= s.top) zoneIndex = i;
        if (!s.active) continue;
        const target = s.sticky ? clamp((this.y - s.top) / Math.max(1, s.height - this.viewport)) : clamp((this.y + this.viewport - s.top) / (s.height + this.viewport));
        const next = this.reduced ? target : s.p + (target - s.p) * (1 - Math.pow(1 - motion.scroll.smoothing, dt / 16.67));
        if (Math.abs(next - target) > motion.scroll.settle) moving = true;
        s.p = Math.abs(next - target) < motion.scroll.settle ? target : next;
        s.el.style.setProperty('--p', s.p.toFixed(4));
        if (!this.reduced) this.apply(s);
      }
      this.zone = this.sections[zoneIndex]?.el.dataset.zone || 'GROUND';
      if (zoneIndex !== this.lastZone) this.lastZone = zoneIndex;
      this.gauge?.style.setProperty('--page-p', this.pageProgress.toFixed(4));
      this.dirty = moving;
    }
    for (let i = 0; i < this.clients.length; i++) if (this.clients[i](time, dt)) moving = true;
    if (moving || this.dirty) this.wake();
  };
  private apply(s: JourneySection): void {
    const p = s.p, style = s.el.style;
    if (s.el.id === 'top') {
      style.setProperty('--name-drift', range(p, 0, motion.hero.nameEnd).toFixed(4));
      style.setProperty('--name-opacity', (1 - range(p, 0, motion.hero.nameEnd)).toFixed(4));
      style.setProperty('--zoom', (1 + (motion.hero.zoom - 1) * Math.pow(range(p, 0, motion.hero.zoomEnd), 3)).toFixed(4));
      style.setProperty('--frame-opacity', (1 - range(p, motion.hero.frameStart, motion.hero.frameEnd)).toFixed(4));
      style.setProperty('--fog-p', range(p, motion.hero.fogStart, motion.hero.fogEnd).toFixed(4));
      style.setProperty('--glass-opacity', (1 - range(p, .88, 1)).toFixed(4));
      const flash = p < motion.hero.flashPeak ? range(p, motion.hero.flashStart, motion.hero.flashPeak) : 1 - range(p, motion.hero.flashPeak, motion.hero.flashEnd);
      style.setProperty('--flash', (flash * .35).toFixed(4));
      style.setProperty('--sky-reveal', range(p, .6, 1).toFixed(4));
    } else if (s.el.id === 'about') {
      style.setProperty('--words', expoOut(range(p, 0, motion.statement.wordsEnd)).toFixed(4));
      style.setProperty('--rise', expoOut(range(p, motion.statement.riseStart, motion.statement.riseEnd)).toFixed(4));
    } else if (s.el.classList.contains('slab')) {
      const enter = expoOut(clamp((this.y + this.viewport - s.top) / (this.viewport * motion.slabs.enterRange)));
      style.setProperty('--enter', enter.toFixed(4));
    } else if (s.el.id === 'mission') {
      for (let i = 0; i < this.lines.length; i++) {
        const t = motion.manifesto.thresholds[i];
        const visible = expoOut(range(p, t, t + motion.manifesto.revealRange));
        this.lines[i].style.setProperty('--line', visible.toFixed(4));
        const dim = i < 2 && p > motion.manifesto.thresholds[i + 1] && p < .9;
        this.lines[i].style.opacity = (visible * (dim ? .35 : 1)).toFixed(4);
      }
    }
  }
}
