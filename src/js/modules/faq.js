/* faq.js — Accordion de perguntas frequentes */

export function initFaq() {
  const items = document.querySelectorAll('.faq__item');
  if (!items.length) return;

  items.forEach(item => {
    const btn = item.querySelector('.faq__question');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      /* Fecha todos antes de abrir o clicado */
      items.forEach(other => {
        other.classList.remove('is-open');
        const otherBtn = other.querySelector('.faq__question');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
