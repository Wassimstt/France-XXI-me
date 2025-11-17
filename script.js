// Simple template router + small Instagram tab logic
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

    // After rendering, attach Instagram tab behavior if present
    setupInstagramTabs();
  }

  // navigation via menu links
  document.querySelectorAll('.main-nav a').forEach(a => {
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      const page = a.dataset.page || 'home';
      location.hash = '#/' + page;
    });
  });

  // data-goto buttons
  document.body.addEventListener('click', function(e){
    const go = e.target.closest('[data-goto]');
    if (go) {
      const p = go.getAttribute('data-goto');
      location.hash = '#/' + p;
    }
  });

  // resolve hash to page
  function resolveHash() {
    const h = location.hash.replace(/^#\/?/, '');
    const page = h || 'home';
    render(page);
  }

  window.addEventListener('hashchange', resolveHash);
  resolveHash();

  // Instagram simple tabs
  function setupInstagramTabs(){
    const tabs = document.querySelectorAll('.tab');
    if (!tabs) return;
    tabs.forEach(t => {
      t.addEventListener('click', () => {
        tabs.forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        const target = t.dataset.tab;
        // for this simple demo, only Posts tab shows content; others can be extended
        const posts = document.getElementById('insta-posts');
        if (posts) {
          if (target === 'posts') posts.style.display = 'grid';
          else posts.style.display = 'none';
        }
      });
    });
  }

})();
