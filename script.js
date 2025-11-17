// Tiny template router: loads templates into #app based on hash routes
(function(){
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // optional: attach click handlers for large images to open in new tab
    app.querySelectorAll('.photo-grid a, .gallery-grid a').forEach(a => {
      a.addEventListener('click', (ev) => {
        // default opens in new tab via target="_blank" in template links
      });
    });
  }

  // handle clicks on menu anchors
  document.body.addEventListener('click', function(e){
    const a = e.target.closest('[data-goto]');
    if (a) { e.preventDefault(); const p = a.getAttribute('data-goto'); location.hash = '#/' + p; return; }
  });

  document.querySelectorAll('.main-nav a').forEach(a => {
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      const page = a.dataset.page || 'home';
      location.hash = '#/' + page;
    });
  });

  function resolveHash() {
    const h = location.hash.replace(/^#\/?/, '');
    const page = h || 'home';
    render(page);
  }

  window.addEventListener('hashchange', resolveHash);
  resolveHash();
})();
