(function () {
  let cache = null;
  let pending = null;

  function load() {
    if (cache) return Promise.resolve(cache);
    if (pending) return pending;
    pending = fetch('data/catalog.json')
      .then(r => {
        if (!r.ok) throw new Error('Failed to load data/catalog.json: ' + r.status);
        return r.json();
      })
      .then(data => { cache = data; pending = null; return data; })
      .catch(err => { pending = null; throw err; });
    return pending;
  }

  function formatPrice(price, currency) {
    if (price == null) return '';
    const symbol = currency === 'UAH' ? '₴' : (currency || '');
    const num = String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return symbol ? `${symbol} ${num}` : num;
  }

  window.SolCatalog = { load, formatPrice };
})();
