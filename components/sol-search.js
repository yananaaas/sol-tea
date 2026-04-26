(function () {
  function injectSearchStyles() {
    if (document.getElementById('sol-search-styles')) return;
    const style = document.createElement('style');
    style.id = 'sol-search-styles';
    style.textContent = `
      sol-search { display: contents; }

      /* Desktop nav search pill */
      .nav-search { display: flex; align-items: center; gap: 10px; background: var(--sand); border-radius: 40px; padding: 14px 22px; transition: background 0.2s; width: 280px; flex-shrink: 0; }
      .nav-search:focus-within { background: var(--gray-100); }
      .nav-search i { font-size: 20px; color: var(--gray-500); flex-shrink: 0; }
      .nav-search-input { flex: 1; background: transparent; border: none; outline: none; font-family: 'DM Sans', sans-serif; font-size: 15px; color: var(--black); min-width: 0; cursor: text; }
      .nav-search-input::placeholder { color: var(--gray-500); }
      .nav-search-clear { display: none; background: none; border: none; cursor: pointer; color: var(--gray-500); font-size: 18px; padding: 0; width: 20px; height: 20px; align-items: center; justify-content: center; flex-shrink: 0; transition: color 0.15s; }
      .nav-search-clear.visible { display: flex; }
      @media (hover: hover) { .nav-search-clear:hover { color: var(--black); } }

      /* Nav flex spacer */
      .nav-spacer { flex: 1; }

      /* Mobile nav search trigger button (HTML lives in sol-nav.js) */
      .nav-search-mobile { display: none; }

      /* Mobile inline search (shown inside nav when search-active) */
      .nav-search-inline { display: none; flex: 1; align-items: center; gap: 6px; background: var(--sand); border-radius: 40px; padding: 10px 16px; margin-left: 8px; }
      .nav-search-inline i { font-size: 16px; color: var(--gray-500); flex-shrink: 0; }
      .nav-search-inline-input { flex: 1; min-width: 0; background: transparent; border: none; outline: none; font-family: 'DM Sans', sans-serif; font-size: 16px; color: var(--black); }
      .nav-search-inline-input::placeholder { color: var(--gray-500); }
      .search-close-btn { background: none; border: none; cursor: pointer; color: var(--gray-500); font-size: 14px; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; padding: 0; }

      /* Search overlay (desktop, appears below nav) */
      .search-overlay { display: none; position: fixed; top: 80px; left: 0; right: 0; z-index: 99; background: var(--cream); padding: 12px max(48px, calc((100vw - 1440px) / 2 + 48px)); box-shadow: 0 4px 20px rgba(28,26,20,0.08); }
      .search-overlay.open { display: flex; }
      .search-overlay-inner { display: flex; align-items: center; gap: 10px; width: 100%; max-width: 1280px; margin: 0 auto; background: var(--sand); border-radius: 40px; padding: 10px 18px; }
      .search-overlay-inner > i { font-size: 18px; color: var(--gray-500); flex-shrink: 0; }
      .search-overlay-input { flex: 1; background: transparent; border: none; outline: none; font-family: 'DM Sans', sans-serif; font-size: 15px; color: var(--black); }
      .search-overlay-input::placeholder { color: var(--gray-500); }
      .search-clear-btn { opacity: 0; pointer-events: none; transition: opacity 0.15s; }
      .search-clear-btn.visible { opacity: 1; pointer-events: all; }

      /* Search panel (fullscreen results overlay) */
      .search-panel { position: fixed; inset: 0; background: var(--cream); z-index: 300; overflow-y: auto; opacity: 0; pointer-events: none; transform: translateY(-8px); transition: opacity 0.22s ease, transform 0.22s ease; }
      .search-panel.open { opacity: 1; pointer-events: all; transform: translateY(0); }
      .search-panel-inner { max-width: 1280px; margin: 0 auto; padding: 120px 48px 80px; }
      .search-panel-header { margin-bottom: 40px; }
      .search-panel-title { font-family: 'Inter', sans-serif; font-size: clamp(24px, 3vw, 36px); font-weight: 900; color: var(--black); letter-spacing: -0.02em; }
      .search-panel-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; }
      .search-panel-empty { font-family: 'DM Sans', sans-serif; font-size: 18px; color: var(--gray-500); text-align: center; padding: 60px 0; }
      .search-highlight { background: var(--gray-100); color: var(--black); border-radius: 4px; padding: 0 2px; }

      @media (max-width: 1024px) { .search-panel-grid { grid-template-columns: repeat(3, 1fr); } }

      @media (max-width: 768px) {
        .nav-search { display: none; }
        .nav-spacer { display: none; }
        .nav-search-mobile { display: flex; }
        .search-overlay { top: 72px; padding: 12px 16px; display: none !important; }
        .search-overlay-input { font-size: 16px; }
        nav.search-active .nav-right { display: none; }
        nav.search-active .burger-btn { display: none !important; }
        .nav-search-inline { display: flex !important; opacity: 0; width: 0; overflow: hidden; padding: 0; pointer-events: none; margin-left: 0; flex: 0 0 auto; align-self: center; transition: opacity 0.22s ease, padding 0.22s ease; }
        .nav-search-inline i { font-size: 22px; }
        nav.search-active .nav-spacer { display: none; }
        nav.search-active .nav-search-inline { opacity: 1; flex: 1; width: auto; overflow: visible; pointer-events: all; padding: 10px 14px; margin-left: 12px; }
        .search-panel-inner { padding: 96px 24px 60px; }
        .search-panel-grid { grid-template-columns: 1fr; }
      }
    `;
    document.head.appendChild(style);
  }

  // --- Search logic (default behaviour for pages with the panel) ---

  function ensureCatalog() {
    if (!window.SolCatalog) return Promise.resolve([]);
    return SolCatalog.load();
  }

  function escAttr(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/'/g, '&#39;').replace(/"/g, '&quot;');
  }

  function runSearch(query) {
    const panel = document.getElementById('searchPanel');
    if (!panel) return;
    const q = (query || '').trim();
    if (!q) {
      panel.classList.remove('open');
      document.body.style.overflow = '';
      return;
    }
    ensureCatalog().then(products => {
      const lq = q.toLowerCase();
      const matches = products.filter(p =>
        (p.name   || '').toLowerCase().includes(lq) ||
        (p.desc   || '').toLowerCase().includes(lq) ||
        (p.region || '').toLowerCase().includes(lq)
      );
      const grid  = document.getElementById('searchPanelGrid');
      const empty = document.getElementById('searchPanelEmpty');
      grid.innerHTML = matches.map((p, i) => `
        <sol-product-card
          name="${escAttr(p.name)}"
          region="${escAttr(p.region || '')}"
          desc="${escAttr(p.desc || '')}"
          price="${escAttr(SolCatalog.formatPrice(p.price, p.currency))}"
          bg="${escAttr(p.bg || '')}"
          badge="${escAttr(p.badge || '')}"
          index="${i}"
          search="${escAttr(q)}"
          cart-fn="solSearchToggleCart"
          show></sol-product-card>
      `).join('');
      empty.style.display = matches.length === 0 ? 'block' : 'none';
      panel.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeAll() {
    const panel   = document.getElementById('searchPanel');
    const overlay = document.getElementById('searchOverlay');
    if (panel)   panel.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
    const nav = document.querySelector('nav');
    if (nav) nav.classList.remove('search-active');
    ['desktopSearchInput', 'searchInput', 'navSearchInput'].forEach(id => {
      const inp = document.getElementById(id);
      if (inp) inp.value = '';
    });
    document.querySelectorAll('.nav-search-clear, #searchClearBtn').forEach(b => b.classList.remove('visible'));
  }

  function openSearch() {
    if (window.innerWidth <= 768) {
      const nav = document.querySelector('nav');
      if (nav) nav.classList.add('search-active');
      const inp = document.getElementById('navSearchInput');
      if (inp) inp.focus();
    } else {
      const overlay = document.getElementById('searchOverlay');
      if (overlay) overlay.classList.add('open');
      const inp = document.getElementById('searchInput');
      if (inp) inp.focus();
    }
  }

  // --- Defaults: only set if the page hasn't already defined its own ---
  // Pages like sol-shop override these with custom inline-search behaviour.

  function setDefault(name, fn) {
    if (typeof window[name] !== 'function') window[name] = fn;
  }

  setDefault('filterProducts', runSearch);
  setDefault('onNavSearchInput', runSearch);
  setDefault('openSearch', openSearch);
  setDefault('closeSearch', closeAll);

  setDefault('onDesktopSearchInput', function (val) {
    runSearch(val);
    const clear = document.getElementById('desktopSearchClear');
    if (clear) clear.classList.toggle('visible', val.length > 0);
  });
  setDefault('clearDesktopSearch', function () {
    const inp = document.getElementById('desktopSearchInput');
    if (inp) inp.value = '';
    const clear = document.getElementById('desktopSearchClear');
    if (clear) clear.classList.remove('visible');
    runSearch('');
  });
  setDefault('onDesktopSearchBlur', function () {
    setTimeout(() => {
      const overlay = document.getElementById('searchOverlay');
      const inp = document.getElementById('desktopSearchInput');
      if (overlay && inp && !inp.value) overlay.classList.remove('open');
    }, 150);
  });

  // Default cart toggle for product cards rendered inside the search panel.
  // Pages can still override by setting their own window.solSearchToggleCart.
  setDefault('solSearchToggleCart', function (name, btn) {
    let cart;
    try { cart = JSON.parse(sessionStorage.getItem('solCart') || '[]'); }
    catch (e) { cart = []; }
    const idx = cart.findIndex(c => c.name === name);
    const wasIn = idx >= 0;
    if (wasIn) cart.splice(idx, 1);
    else       cart.push({ name, qty: 1 });
    sessionStorage.setItem('solCart', JSON.stringify(cart));
    const inCart = !wasIn;
    btn.className = 'btn-add' + (inCart ? ' in-cart' : '');
    btn.innerHTML = inCart
      ? '<i class="hgi-stroke hgi-checkmark-circle-02"></i> В кошику'
      : '<i class="hgi-stroke hgi-shopping-bag-add"></i> Кошик';
    ['updateCartBadge', 'updateCartTabCount'].forEach(fn => {
      if (typeof window[fn] === 'function') window[fn]();
    });
  });

  class SolSearch extends HTMLElement {
    connectedCallback() {
      injectSearchStyles();
      const variant = this.getAttribute('variant') || '';

      this.innerHTML = `
        <div class="nav-search">
          <i class="hgi-stroke hgi-search-01"></i>
          <input type="text" id="desktopSearchInput" placeholder="Пошук чаю, інгредієнтів..."
            class="nav-search-input"
            oninput="onDesktopSearchInput(this.value)"
            onblur="onDesktopSearchBlur()">
          <button class="nav-search-clear" id="desktopSearchClear"
            onmousedown="event.preventDefault()"
            onclick="clearDesktopSearch()"><i class="hgi-stroke hgi-cancel-01"></i></button>
        </div>
        <div class="nav-spacer"></div>
        <div class="nav-search-inline" id="navSearchInline">
          <i class="hgi-stroke hgi-search-01"></i>
          <input type="text" id="navSearchInput" placeholder="Пошук чаю, інгредієнтів..."
            class="nav-search-inline-input"
            oninput="if(typeof onNavSearchInput==='function')onNavSearchInput(this.value)"
            onkeydown="if(event.key==='Enter'&&this.value.trim()&&typeof onNavSearchInput!=='function')window.location='sol-shop.html'">
          <button class="search-close-btn" onclick="closeSearch()"><i class="hgi-stroke hgi-cancel-01"></i></button>
        </div>
      `;

      if (variant !== 'shop') {
        if (!document.getElementById('searchOverlay')) {
          const overlay = document.createElement('div');
          overlay.className = 'search-overlay';
          overlay.id = 'searchOverlay';
          overlay.innerHTML = `
            <div class="search-overlay-inner">
              <i class="hgi-stroke hgi-search-01"></i>
              <input type="text" id="searchInput" placeholder="Пошук чаю, інгредієнтів..." class="search-overlay-input"
                oninput="filterProducts(this.value); document.getElementById('searchClearBtn').classList.toggle('visible', this.value.length > 0)">
              <button class="nav-icon-btn search-clear-btn" id="searchClearBtn"
                onclick="document.getElementById('searchInput').value=''; filterProducts(''); this.classList.remove('visible')"><i class="hgi-stroke hgi-cancel-01"></i></button>
            </div>
          `;
          document.body.appendChild(overlay);
        }
        if (!document.getElementById('searchPanel')) {
          const panel = document.createElement('div');
          panel.id = 'searchPanel';
          panel.className = 'search-panel';
          panel.innerHTML = `
            <div class="search-panel-inner">
              <div class="search-panel-header">
                <span class="search-panel-title">Результати пошуку:</span>
              </div>
              <div id="searchPanelGrid" class="search-panel-grid"></div>
              <p id="searchPanelEmpty" class="search-panel-empty" style="display:none">Нічого не знайдено</p>
            </div>
          `;
          document.body.appendChild(panel);
        }
      }
    }
  }

  customElements.define('sol-search', SolSearch);
})();
