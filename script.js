// Petit routeur simple basé sur templates + navigation hash
(function () {
  const app = document.getElementById('app');
  const templates = {};
  document.querySelectorAll('template').forEach(t => templates[t.id.replace('tpl-','')] = t);

  function setActiveLink(name) {
    document.querySelectorAll('.main-nav a').forEach(a => {
      const page = a.dataset.page;
      if (page === name) a.classList.add('active'); else a.classList.remove('active');
    });
  }

  function render(page) {
    if (!templates[page]) page = 'home';
    const clone = templates[page].content.cloneNode(true);
    app.innerHTML = '';
    app.appendChild(clone);
    setActiveLink(page);
    // small UX: scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // navigation via data-goto buttons
  document.body.addEventListener('click', function (e) {
    const g = e.target.closest('[data-goto]');
    if (g) {
      const p = g.getAttribute('data-goto');
      location.hash = '#/' + p;
    }
  });

  // initial load and hash change handling
  function resolveHash() {
    const h = location.hash.replace(/^#\/?/, '');
    const page = h || 'home';
    render(page);
  }

  window.addEventListener('hashchange', resolveHash);
  // initial active link highlight on nav clicks
  document.querySelectorAll('.main-nav a').forEach(a => {
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      const pg = a.dataset.page || 'home';
      location.hash = '#/' + pg;
    });
  });

  // start
  resolveHash();
})();
