import { motion } from '../config/motion';
import type { ScrollJourney } from './ScrollJourney';
export function initAltimeter(engine: ScrollJourney): void {
  const el = document.querySelector<HTMLElement>('.altimeter');
  const number = document.querySelector<HTMLElement>('#altitude'); const zone = document.querySelector<HTMLElement>('#alt-zone');
  if (!el || !number || !zone) return;
  if (!motion.altitude.enabled || engine.reduced) {el.remove(); return;}
  let value = 0, previousZone = '', previousNumber = -1;
  engine.add(() => {const target = engine.pageProgress * motion.altitude.max; value += (target - value) * .1; const rounded = Math.round(value); if (rounded !== previousNumber) {number.textContent = String(rounded).padStart(5, '0'); previousNumber = rounded;} if (previousZone !== engine.zone) {zone.textContent = engine.zone; previousZone = engine.zone;} return Math.abs(target - value) > .5;});
}
