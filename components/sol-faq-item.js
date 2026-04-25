(function () {
  function injectFaqItemStyles() {
    if (document.getElementById('sol-faq-item-styles')) return;
    const style = document.createElement('style');
    style.id = 'sol-faq-item-styles';
    style.textContent = `
      sol-faq-item { display: block; }

      .faq-item { background: var(--cream-bright); border-radius: 20px; overflow: hidden; }
      .faq-question { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 28px; background: none; border: none; cursor: pointer; text-align: left; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 600; color: var(--black); line-height: 1.4; transition: color 0.2s; }
      @media (hover: hover) { .faq-question:hover { color: var(--green-800); } }
      .faq-question-icon { font-size: 22px; color: var(--gray-500); flex-shrink: 0; transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), color 0.2s; }
      .faq-item.open .faq-question-icon { transform: rotate(45deg); color: var(--green-800); }
      .faq-item.open .faq-question { color: var(--green-800); }
      .faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.35s cubic-bezier(0.4,0,0.2,1); }
      .faq-item.open .faq-answer { max-height: 400px; }
      .faq-answer-inner { padding: 0 28px 32px; font-size: 15px; font-weight: 300; color: var(--gray-800); line-height: 1.8; }

      @media (max-width: 768px) {
        .faq-question { padding: 22px; font-size: 15px; }
        .faq-answer-inner { padding: 0 22px 24px; }
      }
    `;
    document.head.appendChild(style);
  }

  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  class SolFaqItem extends HTMLElement {
    static get observedAttributes() {
      return ['question', 'answer', 'open'];
    }

    connectedCallback() {
      injectFaqItemStyles();
      this.render();
    }

    attributeChangedCallback() {
      if (this.isConnected) this.render();
    }

    toggle() {
      const item = this.querySelector('.faq-item');
      if (!item) return;
      item.classList.toggle('open');
    }

    render() {
      const question = this.getAttribute('question') || '';
      const answer   = this.getAttribute('answer')   || '';
      const isOpen   = this.hasAttribute('open');

      this.innerHTML = `
        <div class="faq-item${isOpen ? ' open' : ''}">
          <button type="button" class="faq-question" aria-expanded="${isOpen}">
            ${escHtml(question)}
            <i class="hgi-stroke hgi-add-01 faq-question-icon"></i>
          </button>
          <div class="faq-answer">
            <div class="faq-answer-inner">${escHtml(answer)}</div>
          </div>
        </div>
      `;

      this.querySelector('.faq-question').addEventListener('click', () => {
        const item = this.querySelector('.faq-item');
        const btn  = this.querySelector('.faq-question');
        item.classList.toggle('open');
        btn.setAttribute('aria-expanded', item.classList.contains('open'));
      });
    }
  }

  customElements.define('sol-faq-item', SolFaqItem);
})();
