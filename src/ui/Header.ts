export function initHeader(): void {
  const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
  const menu = document.querySelector<HTMLElement>('.mobile-menu');
  const main = document.querySelector<HTMLElement>('main');
  if (!toggle || !menu || !main) return;
  const links = Array.from(menu.querySelectorAll<HTMLAnchorElement>('a'));
  const close = (restore: boolean): void => {menu.hidden = true; toggle.setAttribute('aria-expanded', 'false'); toggle.textContent = '[ MENU ]'; document.body.classList.remove('menu-open'); main.inert = false; if (restore) toggle.focus();};
  toggle.addEventListener('click', () => {
    if (!menu.hidden) {close(true); return;}
    menu.hidden = false; toggle.setAttribute('aria-expanded', 'true'); toggle.textContent = '[ CLOSE ]'; document.body.classList.add('menu-open'); main.inert = true; links[0]?.focus();
  });
  menu.addEventListener('click', e => {if ((e.target as HTMLElement).closest('a')) close(false);});
  document.addEventListener('keydown', e => {
    if (menu.hidden) return;
    if (e.key === 'Escape') {e.preventDefault(); close(true);}
    if (e.key === 'Tab') {
      const first = links[0], last = links[links.length - 1];
      if (e.shiftKey && document.activeElement === first) {e.preventDefault(); toggle.focus();}
      else if (e.shiftKey && document.activeElement === toggle) {e.preventDefault(); last.focus();}
      else if (!e.shiftKey && document.activeElement === last) {e.preventDefault(); toggle.focus();}
      else if (!e.shiftKey && document.activeElement === toggle) {e.preventDefault(); first.focus();}
    }
  });
  window.matchMedia('(min-width: 900px)').addEventListener('change', e => {if (e.matches) close(false);});
}
