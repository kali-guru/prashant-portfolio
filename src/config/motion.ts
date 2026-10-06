export const motion = {
  intensity: 'full' as 'full' | 'medium' | 'subtle',
  easing: { ui: 'cubic-bezier(.4,0,.2,1)', reveal: 'cubic-bezier(.16,1,.3,1)', inCubic: 'cubic-bezier(.32,0,.67,0)', heavy: 'cubic-bezier(.22,1,.36,1)', expoOut: 'cubic-bezier(.19,1,.22,1)' },
  duration: { fast: 300, base: 600, slow: 1000, cinematic: 1400 },
  stagger: { lines: 60, rows: 50, footer: 40 },
  scroll: { smoothing: .1, settle: .0002, nearMargin: '100% 0px' },
  intro: { enabled: true, counter: 1200, curtain: 900 },
  hero: { track: 260, mobileTrack: 180, subtleTrack: 160, zoom: 9, nameEnd: .15, zoomEnd: .7, frameStart: .4, frameEnd: .75, fogStart: .55, fogEnd: 1, flashStart: .8, flashPeak: .86, flashEnd: .92 },
  statement: { track: 220, wordsEnd: .4, riseStart: .2, riseEnd: .8 },
  slabs: { track: 180, enterRange: .75, titleDelay: 80 },
  archive: { smoothing: .14, opacityFalloff: .3, scaleFalloff: .04, offset: 10, blur: .6 },
  manifesto: { track: 200, thresholds: [.15, .4, .65], revealRange: .16 },
  scramble: { duration: 700, interval: 40, charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+' },
  counter: { duration: 1200 },
  snow: { enabled: true, count: 80, minSpeed: 8, maxSpeed: 24 },
  pointer: { enabled: true, smoothing: .06, tilt: 3, magnetic: 10 },
  globe: { speed: .08, introBoost: 4, boostDecay: 3000, damping: .92, resumeDelay: 2000, maxDpr: 2, keyboardStep: .12, pulseDuration: 2400 },
  altitude: { enabled: true, max: 8848 },
} as const;
export const clamp = (n: number, low = 0, high = 1): number => Math.max(low, Math.min(high, n));
export const range = (n: number, start: number, end: number): number => clamp((n - start) / (end - start));
export const expoOut = (n: number): number => n === 1 ? 1 : 1 - Math.pow(2, -10 * n);
export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
export const desktop = window.matchMedia('(min-width: 900px) and (pointer: fine)');
export function applyMotionTokens(): void {
  const root = document.documentElement.style;
  for (const [key, value] of Object.entries(motion.easing)) root.setProperty('--ease-' + key.replace(/[A-Z]/g, x => '-' + x.toLowerCase()), value);
  for (const [key, value] of Object.entries(motion.duration)) root.setProperty('--' + key, value + 'ms');
  const factor = motion.intensity === 'medium' ? .5 : 1;
  root.setProperty('--hero-track', (motion.intensity === 'subtle' ? motion.hero.subtleTrack : window.innerWidth < 600 ? motion.hero.mobileTrack : motion.hero.track * factor) + 'vh');
  root.setProperty('--statement-track', motion.statement.track * factor + 'vh');
  root.setProperty('--slab-track', motion.slabs.track * factor + 'vh');
  root.setProperty('--manifesto-track', motion.manifesto.track * factor + 'vh');
}
