(function () {
  function injectProductCardStyles() {
    if (document.getElementById('sol-product-card-styles')) return;
    const style = document.createElement('style');
    style.id = 'sol-product-card-styles';
    style.textContent = `
      sol-product-card { display: contents; }

      .product-card {
        background: var(--cream-bright); border-radius: 20px; overflow: hidden;
        transition: transform 0.3s, opacity 0.4s ease, transform 0.4s ease;
        cursor: pointer;
        opacity: 0; transform: translateY(16px);
        display: flex; flex-direction: column;
      }
      .product-card.show { opacity: 1; transform: translateY(0); }
      @media (hover: hover) { .product-card.show:hover { transform: translateY(-6px); } }

      .product-img { aspect-ratio: 4/3; background: var(--sand); position: relative; display: flex; align-items: center; justify-content: center; color: var(--gray-300); font-size: 11px; letter-spacing: 0.08em; }
      .product-region { position: absolute; top: 12px; left: 12px; background: rgba(253,252,249,0.92); border-radius: 20px; padding: 6px 16px; font-size: 10px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gray-800); }
      .product-wish { position: absolute; top: 12px; right: 12px; width: 44px; height: 44px; border-radius: 50%; background: rgba(253,252,249,0.9); display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 20px; color: var(--gray-300); transition: color 0.2s; line-height: 1; border: none; }
      @media (hover: hover) { .product-wish:hover { color: var(--terra); } }
      .product-wish.liked { color: var(--terra); }
      .product-badge { position: absolute; bottom: 12px; left: 12px; border-radius: 20px; padding: 6px 16px; font-size: 10px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; }
      .badge-new { background: var(--green-500); color: var(--cream-bright); }
      .badge-limited { background: var(--terra); color: var(--cream-bright); }
      .product-body { padding: 20px; flex: 1; display: flex; flex-direction: column; }
      .product-body h4 { font-family: 'Inter', sans-serif; font-size: 17px; font-weight: 800; color: var(--black); margin-bottom: 4px; letter-spacing: -0.01em; }
      .product-desc { font-size: 12px; color: var(--gray-500); margin-bottom: 16px; line-height: 1.6; }
      .product-footer { margin-top: auto; display: flex; justify-content: space-between; align-items: center; }
      .product-price { font-family: 'Inter', sans-serif; font-size: 20px; font-weight: 900; color: var(--green-800); letter-spacing: -0.02em; }

      .search-highlight { background: var(--gray-100); color: var(--black); border-radius: 4px; padding: 0 2px; }

      @media (max-width: 768px) {
        .product-img { aspect-ratio: 1/1; }
        .product-body { flex: 1; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; }
        .product-body h4 { font-size: 24px; font-weight: 900; }
        .product-desc { font-size: 13px; line-height: 1.7; }
        .product-price { font-size: 24px; }
      }
    `;
    document.head.appendChild(style);
  }

  function escAttr(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/'/g, '&#39;').replace(/"/g, '&quot;');
  }
  function escJs(s) {
    return String(s == null ? '' : s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  }
  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function highlight(text, query) {
    if (!query) return escHtml(text);
    const safe = escHtml(text);
    const q = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return safe.replace(new RegExp(`(${q})`, 'gi'), '<mark class="search-highlight">$1</mark>');
  }

  function getCart() {
    try { return JSON.parse(sessionStorage.getItem('solCart') || '[]'); } catch (e) { return []; }
  }
  function getWish() {
    try { return JSON.parse(sessionStorage.getItem('solWish') || '[]'); } catch (e) { return []; }
  }

  class SolProductCard extends HTMLElement {
    static get observedAttributes() {
      return ['name', 'region', 'desc', 'price', 'bg', 'badge', 'index', 'search',
              'liked', 'wish-id', 'cart-fn', 'show'];
    }

    connectedCallback() {
      injectProductCardStyles();
      this.render();
    }

    attributeChangedCallback() {
      if (this.isConnected) this.render();
    }

    render() {
      const name    = this.getAttribute('name')    || '';
      const region  = this.getAttribute('region')  || '';
      const desc    = this.getAttribute('desc')    || '';
      const price   = this.getAttribute('price')   || '';
      const bg      = this.getAttribute('bg')      || '';
      const badge   = this.getAttribute('badge')   || '';
      const index   = parseInt(this.getAttribute('index') || '0', 10);
      const search  = this.getAttribute('search')  || '';
      const wishId  = this.getAttribute('wish-id') || name;
      const cartFn  = this.getAttribute('cart-fn') || 'addToCart';
      const isLiked = this.hasAttribute('liked');
      const showNow = this.hasAttribute('show');

      const inCart    = getCart().some(c => c.name === name);
      const likedState = isLiked || getWish().includes(name);

      const safeName   = escJs(name);
      const safeWishId = escJs(wishId);
      const safeCartFn = escJs(cartFn);
      const bgStyle    = bg ? ` style="background:${escAttr(bg)}"` : '';
      const delayStyle = showNow ? '' : ` style="transition-delay:${(index * 0.04).toFixed(2)}s"`;

      const badgeHtml =
        badge === 'new'     ? '<div class="product-badge badge-new">Новинка</div>' :
        badge === 'limited' ? '<div class="product-badge badge-limited">Обмежений</div>' :
        '';

      // Wish button: if `liked` attr → always terra, click removes; otherwise toggle
      const wishOnclick = isLiked
        ? `event.stopPropagation();removeFromWish('${safeWishId}')`
        : `event.stopPropagation();toggleWish(this,'${safeName}')`;
      const wishClass = likedState ? 'product-wish liked' : 'product-wish';
      const wishStyle = likedState ? ' style="color:var(--terra)"' : '';

      this.innerHTML = `
        <div class="product-card${showNow ? ' show' : ''}"${delayStyle} onclick="goToProduct('${safeName}')">
          <div class="product-img"${bgStyle}>Фото
            <div class="product-region">${escHtml(region)}</div>
            <button class="${wishClass}"${wishStyle} onclick="${wishOnclick}"><i class="hgi-stroke hgi-favourite"></i></button>
            ${badgeHtml}
          </div>
          <div class="product-body">
            <h4>${highlight(name, search)}</h4>
            <p class="product-desc">${highlight(desc, search)}</p>
            <div class="product-footer">
              <span class="product-price">${escHtml(price)}</span>
              <button class="btn-add${inCart ? ' in-cart' : ''}" onclick="event.stopPropagation();${safeCartFn}('${safeName}',this)">${inCart ? '<i class="hgi-stroke hgi-checkmark-circle-02"></i> В кошику' : '<i class="hgi-stroke hgi-shopping-bag-add"></i> Кошик'}</button>
            </div>
          </div>
        </div>
      `;
    }

    show() {
      const card = this.querySelector('.product-card');
      if (card) card.classList.add('show');
    }
  }

  customElements.define('sol-product-card', SolProductCard);
})();
