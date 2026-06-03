(function () {
  function loadNav() {
    var placeholder = document.getElementById('nav-placeholder');
    if (!placeholder) return;

    fetch('/components/nav.html')
      .then(function (r) { return r.text(); })
      .then(function (html) {
        placeholder.innerHTML = html;
        setActiveLink();
        initMobileNav();
      })
      .catch(function (e) { console.warn('Nav load failed', e); });
  }

  function setActiveLink() {
    var path = window.location.pathname;
    var links = document.querySelectorAll('.nav a, .mob-nav a');
    links.forEach(function (a) {
      a.classList.remove('nav-active');
      var href = a.getAttribute('href');
      if (href && href !== '#' && path.endsWith(href.replace(/^\//, ''))) {
        a.classList.add('nav-active');
      }
    });
  }

  function initMobileNav() {
    var hambBtn = document.getElementById('hambBtn');
    var mobNav = document.getElementById('mobNav');
    var mobClose = document.getElementById('mobClose');

    if (hambBtn && mobNav) {
      hambBtn.addEventListener('click', function () {
        mobNav.classList.toggle('open');
      });
    }
    if (mobClose && mobNav) {
      mobClose.addEventListener('click', function () {
        mobNav.classList.remove('open');
      });
    }

    // Dropdown hover
    var dropdown = document.querySelector('.nav-dropdown');
    var menu = document.querySelector('.nav-dropdown-menu');
    if (dropdown && menu) {
      dropdown.addEventListener('mouseenter', function () { menu.style.display = 'block'; });
      dropdown.addEventListener('mouseleave', function () { menu.style.display = 'none'; });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNav);
  } else {
    loadNav();
  }
})();
