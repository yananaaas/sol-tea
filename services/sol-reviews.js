(function () {
  let cache = null;
  let pending = null;

  function load() {
    if (cache) return Promise.resolve(cache);
    if (pending) return pending;
    pending = fetch('data/reviews.json')
      .then(r => {
        if (!r.ok) throw new Error('Failed to load data/reviews.json: ' + r.status);
        return r.json();
      })
      .then(data => { cache = data; pending = null; return data; })
      .catch(err => { pending = null; throw err; });
    return pending;
  }

  function getByProductId(productId) {
    if (!cache) return [];
    return cache.filter(r => r.productId === productId && r.status === 'published');
  }

  window.SolReviews = { load, getByProductId };
})();
