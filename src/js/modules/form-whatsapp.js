/* form-whatsapp.js — Envio de formulários via WhatsApp */

export function initFormWhatsapp() {
  const forms = document.querySelectorAll('[data-whatsapp-form]');
  if (!forms.length) return;

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateForm(form)) return;

      const phone = form.dataset.whatsappPhone || '5514997460343';
      const submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      const fields = Array.from(form.querySelectorAll('[data-label]'));

      // Filtra e formata as respostas
      const answersMap = {};
      fields.forEach(field => {
        const label = field.dataset.label;
        if (field.type === 'checkbox') {
          if (field.checked) {
            if (!answersMap[label]) answersMap[label] = [];
            answersMap[label].push(field.value);
          }
        } else if (field.type === 'radio') {
          if (field.checked) {
            answersMap[label] = field.value;
          }
        } else {
          if (field.value.trim() !== '') {
            answersMap[label] = field.value.trim();
          }
        }
      });

      const lines = Object.entries(answersMap).map(([label, val]) => {
        if (Array.isArray(val)) {
          return `*${label}:* ${val.join(', ')}`;
        }
        return `*${label}:* ${val}`;
      });

      const formTitle = form.dataset.whatsappTitle || 'Pré-Avaliação Clínico';
      const message = `*${formTitle}*\n\n${lines.join('\n')}`;

      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

      showSuccess(form);
      
      // Pequeno timeout para o usuário visualizar o feedback de sucesso antes do redirecionamento
      setTimeout(() => {
        window.open(url, '_blank');
        if (submitBtn) submitBtn.disabled = false;
      }, 1000);
    });
  });
}

function validateForm(form) {
  let valid = true;
  const required = form.querySelectorAll('[required]');

  required.forEach(field => {
    field.classList.remove('is-error');
    const errorEl = form.querySelector(`[data-error-for="${field.id}"]`);

    if (field.type === 'checkbox' || field.type === 'radio') {
      // Para checkbox/radio requeridos, valida se algum elemento com o mesmo nome está checado
      const siblings = form.querySelectorAll(`[name="${field.name}"]`);
      const checkedSome = Array.from(siblings).some(el => el.checked);
      if (!checkedSome) {
        valid = false;
        siblings.forEach(el => el.classList.add('is-error'));
        if (errorEl) errorEl.style.display = 'flex';
      } else {
        siblings.forEach(el => el.classList.remove('is-error'));
        if (errorEl) errorEl.style.display = 'none';
      }
    } else {
      if (!field.value.trim()) {
        valid = false;
        field.classList.add('is-error');
        if (errorEl) errorEl.style.display = 'flex';
      } else {
        if (errorEl) errorEl.style.display = 'none';
      }
    }
  });

  return valid;
}

function showSuccess(form) {
  const successEl = form.querySelector('.form__success');
  if (successEl) {
    form.querySelectorAll('.form__group, .form__row, [type="submit"], .form__privacy').forEach(el => {
      el.style.display = 'none';
    });
    successEl.classList.add('is-visible');
  }
}
