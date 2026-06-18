/* main.js — Entry point ES Module */

import { initHeader }       from './modules/header.js';
import { initFaq }          from './modules/faq.js';
import { initFormWhatsapp } from './modules/form-whatsapp.js';
import { initScrollReveal } from './modules/scroll-reveal.js';
import { initAnalyticsEvents, initScrollTracking } from './modules/analytics.js';
import { initCookieBanner } from './modules/cookie-banner.js';
import { initVideoModal }   from './modules/video-modal.js';

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initFaq();
  initFormWhatsapp();
  initScrollReveal();
  initAnalyticsEvents();
  initScrollTracking();
  initCookieBanner();
  initVideoModal();
});

