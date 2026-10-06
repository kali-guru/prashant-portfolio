import { motion } from '../config/motion';
import type { ScrollJourney } from './ScrollJourney';
export function initAltimeter(engine: ScrollJourney): void {
  const el = document.querySelector<HTMLElement>('.altimeter');
  const number = document.querySelector<HTMLElement>('#altitude'); const zone = document.querySelector<HTMLElement>('#alt-zone');
  if (!el || !number || !zone) return;
  if (!motion.altitude.enabled || engine.reduced) {el.remove(); return;}
  let value = 0, previousZone = '';
  engine.add(() => {const target = engine.pageProgress * motion.altitude.max; value += (target - value) * .1; number.textContent = String(Math.round(value)).padStart(5, '0'); if (previousZone !== engine.zone) {zone.textContent = engine.zone; previousZone = engine.zone;} return Math.abs(target - value) > .5;});
}
