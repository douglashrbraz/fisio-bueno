/* cookie-banner.js — Banner simples de consentimento de cookies (LGPD) */

export function initCookieBanner() {
  if (localStorage.getItem('cookies-aceitos')) return;

  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.innerHTML = `
    <div class="cookie-banner__inner">
      <p class="cookie-banner__text">Este site usa cookies para melhorar sua experiência e analisar o tráfego do site.</p>
      <button class="btn btn--secondary btn--sm" id="aceitar-cookies">Aceitar e Continuar</button>
    </div>
  `;
  document.body.appendChild(banner);

  document.getElementById('aceitar-cookies').addEventListener('click', () => {
    localStorage.setItem('cookies-aceitos', 'true');
    banner.remove();
  });
}
