/* video-modal.js — Controle do modal de vídeo do Instagram */

export function initVideoModal() {
  const openBtn = document.getElementById('open-video-modal');
  const modal = document.getElementById('video-modal');
  const overlay = document.getElementById('video-modal-overlay');
  const closeBtn = document.getElementById('close-video-modal');
  const iframeContainer = document.getElementById('video-modal-iframe-container');

  if (!openBtn || !modal || !overlay || !closeBtn || !iframeContainer) {
    return;
  }

  const reelUrl = 'https://www.instagram.com/reel/C6oR5fjAVS1/embed';

  const openModal = () => {
    // Injetar o iframe do Instagram
    iframeContainer.innerHTML = `
      <iframe 
        src="${reelUrl}" 
        scrolling="no" 
        allowtransparency="true" 
        allow="encrypted-media" 
        aria-label="Vídeo do Dr. Evandro Bueno no Instagram"
      ></iframe>
    `;
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden'; // Impede o scroll da página de fundo
    closeBtn.focus();
  };

  const closeModal = () => {
    modal.classList.remove('is-active');
    document.body.style.overflow = ''; // Restaura o scroll
    // Destruir o iframe para parar o vídeo e áudio imediatamente
    iframeContainer.innerHTML = '';
    openBtn.focus();
  };

  // Event Listeners
  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  // Fechar com a tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });
}
