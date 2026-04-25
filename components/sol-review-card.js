(function () {
  function injectReviewCardStyles() {
    if (document.getElementById('sol-review-card-styles')) return;
    const style = document.createElement('style');
    style.id = 'sol-review-card-styles';
    style.textContent = `
      sol-review-card { display: contents; }
      sol-review-card[variant="marquee"] { display: flex; flex-shrink: 0; width: 360px; }

      .testimonial { background: var(--cream-bright); border-radius: 20px; padding: 32px; display: flex; flex-direction: column; gap: 24px; }
      .testimonial-text { font-size: 15px; line-height: 1.7; color: var(--black); flex: 1; }
      .testimonial-footer { display: flex; align-items: center; justify-content: space-between; margin-top: auto; }
      .testimonial-user { display: flex; align-items: center; gap: 12px; }
      .testimonial-avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--green-800); display: flex; align-items: center; justify-content: center; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 800; color: var(--cream-bright); flex-shrink: 0; }
      .testimonial-name { font-size: 14px; font-weight: 600; color: var(--black); }
      .testimonial-handle { font-size: 12px; color: var(--gray-500); }
      .testimonial-rating { background: var(--green-800); color: var(--cream-bright); border-radius: 20px; padding: 5px 12px; font-size: 12px; font-weight: 500; white-space: nowrap; }

      .testimonial--marquee { width: 100%; flex: 1; }
      .testimonial--marquee .testimonial-text { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
    `;
    document.head.appendChild(style);
  }

  const AVATAR_COLORS = ['#226F54', '#C4855A', '#4A4538', '#7A7060', '#7CC44A', '#B5AFA3'];

  function escAttr(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/'/g, '&#39;').replace(/"/g, '&quot;');
  }
  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function getInitials(author) {
    return String(author || '')
      .trim()
      .split(/\s+/)
      .map(w => w[0] || '')
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  function formatRating(r) {
    if (r == null || r === '') return '';
    const num = Number(r);
    if (!Number.isFinite(num)) return String(r);
    return Number.isInteger(num) ? num.toFixed(1) : String(num);
  }

  class SolReviewCard extends HTMLElement {
    static get observedAttributes() {
      return ['text', 'author', 'handle', 'rating', 'color', 'index', 'variant'];
    }

    connectedCallback() {
      injectReviewCardStyles();
      this.render();
    }

    attributeChangedCallback() {
      if (this.isConnected) this.render();
    }

    render() {
      const text    = this.getAttribute('text')    || '';
      const author  = this.getAttribute('author')  || '';
      const handle  = this.getAttribute('handle')  || '';
      const rating  = this.getAttribute('rating');
      const variant = this.getAttribute('variant') || '';
      const index   = parseInt(this.getAttribute('index') || '0', 10);
      const color   = this.getAttribute('color')
        || AVATAR_COLORS[((isNaN(index) ? 0 : index) % AVATAR_COLORS.length + AVATAR_COLORS.length) % AVATAR_COLORS.length];

      const initials   = getInitials(author);
      const ratingText = formatRating(rating);
      const cardClass  = variant === 'marquee' ? 'testimonial testimonial--marquee' : 'testimonial';

      this.innerHTML = `
        <div class="${cardClass}">
          <p class="testimonial-text">${escHtml(text)}</p>
          <div class="testimonial-footer">
            <div class="testimonial-user">
              <div class="testimonial-avatar" style="background:${escAttr(color)}">${escHtml(initials)}</div>
              <div>
                <div class="testimonial-name">${escHtml(author)}</div>
                <div class="testimonial-handle">${escHtml(handle)}</div>
              </div>
            </div>
            ${ratingText ? `<span class="testimonial-rating">★ ${escHtml(ratingText)}</span>` : ''}
          </div>
        </div>
      `;
    }
  }

  customElements.define('sol-review-card', SolReviewCard);
})();
