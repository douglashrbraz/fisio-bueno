/* header.js — Header transparente → sólido ao rolar + menu mobile */

export function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const menuBtn = header.querySelector('.header__menu-btn');
  const hasTransparent = header.classList.contains('header--transparent');

  /* Scroll behavior */
  function updateHeader() {
    if (!hasTransparent) return;
    if (window.scrollY > 60) {
      header.classList.add('header--solid');
      header.classList.remove('header--transparent');
    } else {
      header.classList.remove('header--solid');
      header.classList.add('header--transparent');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* Menu mobile */
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const isOpen = header.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      menuBtn.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    });

    /* Fecha ao clicar fora */
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) {
        header.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    /* Fecha ao clicar em link do drawer */
    const drawerLinks = header.querySelectorAll('.header__drawer-link');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        header.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}
