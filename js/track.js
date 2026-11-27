/*
 * Bobi Group – cookieless click tracking via Vercel Web Analytics custom events.
 * Events: "Call" (tel: links), "Viber" (viber: links), "Form Submit" (form button
 * pressed with all required fields filled). Data: place (where on the page) + page path.
 * No personal data is sent. Does not change any link or form behaviour.
 *
 * SCRIPT_SRC: if the Vercel dashboard (Analytics → Enable) shows a different
 * script path for this project, replace the value below with that path.
 */
(function () {
  var SCRIPT_SRC = '/_vercel/insights/script.js';

  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  var s = document.createElement('script');
  s.defer = true;
  s.src = SCRIPT_SRC;
  document.head.appendChild(s);

  function place(el) {
    if (el.closest('.mobile-call-bar')) return 'bottom_bar';
    if (el.closest('.fab-phone, .viber-fab')) return 'floating_button';
    if (el.closest('.hero, .info-strip')) return 'hero';
    if (el.closest('#mobNav, .header')) return 'header';
    if (el.closest('.footer')) return 'footer';
    if (el.closest('.leaflet-container')) return 'map';
    if (el.closest('#contact')) return 'contact';
    return 'content';
  }

  function send(name, el) {
    try { window.va('event', { name: name, data: { place: place(el), page: location.pathname } }); } catch (e) {}
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (a) {
      var href = a.getAttribute('href') || '';
      if (href.indexOf('tel:') === 0) send('Call', a);
      else if (href.indexOf('viber:') === 0) send('Viber', a);
      return;
    }
    var btn = e.target.closest && e.target.closest('.f-submit');
    if (btn && !btn.disabled) {
      // Mirror submitForm()'s required-field check (read-only) so invalid attempts are not counted.
      var v = function (id) { var x = document.getElementById(id); return x ? x.value.trim() : ''; };
      if (v('f-name') && v('f-phone') && v('f-svc')) send('Form Submit', btn);
    }
  }, true);
})();
