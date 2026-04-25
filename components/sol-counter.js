(function () {
  function injectCounterStyles() {
    if (document.getElementById('sol-counter-styles')) return;
    const style = document.createElement('style');
    style.id = 'sol-counter-styles';
    style.textContent = `
      sol-counter { display: inline-flex; }

      .qty-ctrl { display: inline-flex; align-items: center; background: var(--sand); border-radius: 40px; padding: 4px; gap: 2px; }
      .qty-btn { width: 32px; height: 32px; border-radius: 50%; border: none; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 16px; color: var(--gray-800); transition: background 0.15s; flex-shrink: 0; }
      @media (hover: hover) { .qty-btn:hover { background: var(--gray-100); } }
      .qty-btn:disabled { opacity: 0.35; cursor: default; }
      @media (hover: hover) { .qty-btn:disabled:hover { background: transparent; } }
      .qty-num { min-width: 28px; text-align: center; font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; color: var(--black); }
    `;
    document.head.appendChild(style);
  }

  function toInt(v, fallback) {
    const n = parseInt(v, 10);
    return Number.isFinite(n) ? n : fallback;
  }

  class SolCounter extends HTMLElement {
    static get observedAttributes() {
      return ['value', 'min', 'max'];
    }

    connectedCallback() {
      injectCounterStyles();
      this.render();
    }

    attributeChangedCallback() {
      if (this.isConnected) this.render();
    }

    get value() {
      return toInt(this.getAttribute('value'), toInt(this.getAttribute('min'), 1));
    }

    set value(v) {
      this.setAttribute('value', String(v));
    }

    _step(delta) {
      const min = toInt(this.getAttribute('min'), 1);
      const maxAttr = this.getAttribute('max');
      const max = maxAttr == null ? Infinity : toInt(maxAttr, Infinity);
      const current = this.value;
      const next = Math.min(max, Math.max(min, current + delta));
      if (next === current) return;
      this.setAttribute('value', String(next));
      this.dispatchEvent(new CustomEvent('change', {
        bubbles: true,
        detail: { value: next, delta }
      }));
    }

    render() {
      const min = toInt(this.getAttribute('min'), 1);
      const maxAttr = this.getAttribute('max');
      const max = maxAttr == null ? Infinity : toInt(maxAttr, Infinity);
      const value = this.value;
      const minusDisabled = value <= min;
      const plusDisabled = value >= max;

      this.innerHTML = `
        <div class="qty-ctrl">
          <button type="button" class="qty-btn" data-action="decrement" ${minusDisabled ? 'disabled' : ''} aria-label="Зменшити">
            <i class="hgi-stroke hgi-minus-sign"></i>
          </button>
          <span class="qty-num">${value}</span>
          <button type="button" class="qty-btn" data-action="increment" ${plusDisabled ? 'disabled' : ''} aria-label="Збільшити">
            <i class="hgi-stroke hgi-plus-sign"></i>
          </button>
        </div>
      `;

      const minus = this.querySelector('[data-action="decrement"]');
      const plus = this.querySelector('[data-action="increment"]');
      if (minus) minus.addEventListener('click', () => this._step(-1));
      if (plus) plus.addEventListener('click', () => this._step(1));
    }
  }

  customElements.define('sol-counter', SolCounter);
})();
