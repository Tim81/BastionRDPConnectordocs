// lang.js — Language detection and switching for Azure Bastion RDP Connector docs
// Supports: en, nl, de, fr, es, pt
// Priority: URL ?lang= param > localStorage > browser language > English fallback

(function () {
  var SUPPORTED = ['en', 'nl', 'de', 'fr', 'es', 'pt'];
  var FILES = {
    en: 'index.html',
    nl: 'index.nl.html',
    de: 'index.de.html',
    fr: 'index.fr.html',
    es: 'index.es.html',
    pt: 'index.pt.html'
  };

  function detect() {
    // 1. URL parameter: ?lang=nl
    try {
      var params = new URLSearchParams(window.location.search);
      var urlLang = params.get('lang');
      if (urlLang && SUPPORTED.indexOf(urlLang) !== -1) return urlLang;
    } catch (e) {}

    // 2. localStorage saved preference
    try {
      var saved = localStorage.getItem('bastionrdp-docs-lang');
      if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch (e) {}

    // 3. Browser language (try all preferred languages)
    var langs = navigator.languages || [navigator.language || navigator.userLanguage || 'en'];
    for (var i = 0; i < langs.length; i++) {
      var code = langs[i].split('-')[0].toLowerCase();
      if (SUPPORTED.indexOf(code) !== -1) return code;
    }

    // 4. Fallback to English
    return 'en';
  }

  function currentLang() {
    var path = window.location.pathname;
    var file = path.split('/').pop() || 'index.html';
    // Handle GitHub Pages root (no filename)
    if (file === '' || file === '/') file = 'index.html';
    for (var lang in FILES) {
      if (FILES[lang] === file) return lang;
    }
    return 'en';
  }

  function init() {
    var desired = detect();
    var current = currentLang();

    // Redirect if we're on the wrong language file
    if (desired !== current) {
      var hash = window.location.hash || '';
      window.location.replace(FILES[desired] + hash);
      return;
    }

    // Persist the choice
    try { localStorage.setItem('bastionrdp-docs-lang', current); } catch (e) {}

    // Highlight active language button
    var buttons = document.querySelectorAll('.lang-picker-btn');
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      btn.classList.toggle('active', btn.getAttribute('data-lang') === current);
    }
  }

  // Public: called by picker buttons
  window.switchLang = function (lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    try { localStorage.setItem('bastionrdp-docs-lang', lang); } catch (e) {}
    var hash = window.location.hash || '';
    window.location.href = FILES[lang] + hash;
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
