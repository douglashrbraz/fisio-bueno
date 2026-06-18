/* analytics.js — Rastreamento de eventos do GA4 */

export function initAnalyticsEvents() {
  const ctaButtons = document.querySelectorAll('[data-analytics="cta"]');

  ctaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof gtag === 'function') {
        gtag('event', 'cta_click', {
          event_category: 'engajamento',
          event_label: btn.textContent.trim(),
        });
      }
    });
  });
}

export function initScrollTracking() {
  const milestones = { 50: false, 90: false };

  window.addEventListener('scroll', () => {
    const percent = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );

    if (percent >= 50 && !milestones[50]) {
      milestones[50] = true;
      if (typeof gtag === 'function') {
        gtag('event', 'scroll_50', { event_category: 'engajamento' });
      }
    }

    if (percent >= 90 && !milestones[90]) {
      milestones[90] = true;
      if (typeof gtag === 'function') {
        gtag('event', 'scroll_90', { event_category: 'engajamento' });
      }
    }
  });
}
