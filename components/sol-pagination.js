(function () {
  function injectPaginationStyles() {
    if (document.getElementById('sol-pagination-styles')) return;
    const style = document.createElement('style');
    style.id = 'sol-pagination-styles';
    style.textContent = `
      sol-pagination { display: flex; align-items: center; justify-content: center; gap: 6px; flex-wrap: nowrap; padding: 60px 0 100px; }

      .page-btn { width: 40px; height: 40px; flex-shrink: 0; border-radius: 50%; border: none; background: var(--sand); color: var(--gray-800); font-family: 'DM Sans', sans-serif; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
      @media (hover: hover) { .page-btn:hover { background: var(--gray-100); } }
      .page-btn.active { background: var(--green-800); color: var(--cream-bright); }
      .page-btn:disabled { opacity: 0.4; cursor: default; }
      @media (hover: hover) { .page-btn:disabled:hover { background: var(--sand); } }
      .page-dots { color: var(--gray-300); font-size: 14px; width: 32px; text-align: center; flex-shrink: 0; letter-spacing: 2px; }
    `;
    document.head.appendChild(style);
  }

  class SolPagination extends HTMLElement {
    static get observedAttributes() {
      return ['current', 'total'];
    }

    connectedCallback() {
      injectPaginationStyles();
      this.render();
    }

    attributeChangedCallback() {
      if (this.isConnected) this.render();
    }

    render() {
      const current = parseInt(this.getAttribute('current') || '1', 10);
      const total   = parseInt(this.getAttribute('total')   || '0', 10);

      if (total < 1) {
        this.innerHTML = '';
        this.style.display = 'none';
        return;
      }
      this.style.display = 'flex';

      // Pages to show: 1, last, current ±1
      const show = new Set([1, total, current]);
      if (current > 1) show.add(current - 1);
      if (current < total) show.add(current + 1);
      const sorted = [...show].sort((a, b) => a - b);

      const prevDisabled = current === 1;
      const nextDisabled = current === total;

      let html = `<button type="button" class="page-btn" data-page="${current - 1}" ${prevDisabled ? 'disabled' : ''}><i class="hgi-stroke hgi-arrow-left-01"></i></button>`;

      let prev = 0;
      for (const p of sorted) {
        if (p - prev > 1) html += '<span class="page-dots">···</span>';
        html += `<button type="button" class="page-btn${p === current ? ' active' : ''}" data-page="${p}">${p}</button>`;
        prev = p;
      }

      html += `<button type="button" class="page-btn" data-page="${current + 1}" ${nextDisabled ? 'disabled' : ''}><i class="hgi-stroke hgi-arrow-right-01"></i></button>`;

      this.innerHTML = html;

      this.querySelectorAll('.page-btn:not([disabled])').forEach(btn => {
        btn.addEventListener('click', () => {
          const page = parseInt(btn.dataset.page, 10);
          this.dispatchEvent(new CustomEvent('page-change', {
            bubbles: true,
            detail: { page }
          }));
        });
      });
    }
  }

  customElements.define('sol-pagination', SolPagination);
})();
