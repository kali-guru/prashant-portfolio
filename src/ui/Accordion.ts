export function initAccordion(): void {
  const panels = Array.from(document.querySelectorAll<HTMLDetailsElement>('.accordions details'));
  const scenes = Array.from(document.querySelectorAll<HTMLElement>('.scene'));
  const label = document.querySelector<HTMLElement>('.media-label');
  for (let i = 0; i < panels.length; i++) {
    const panel = panels[i];
    panel.addEventListener('toggle', () => {
      if (!panel.open) return;
      panels.forEach(other => {if (other !== panel) other.open = false;});
      scenes.forEach(scene => scene.classList.toggle('active', scene.dataset.for === panel.dataset.scene));
      if (label) label.textContent = '[ SYSTEM / ' + String(i + 1).padStart(2, '0') + ' ]';
    });
  }
}
