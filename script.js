/* ==========================================================================
   BOGOODSKI.dev — Script
   No dependencies, no trackers, no cookies. Just a little progressive
   enhancement; the page works fine without it.
   ========================================================================== */

(function () {
  'use strict';

  // --- Mobile nav ---------------------------------------------------------
  var toggle = document.querySelector('.nav-toggle');
  var navList = document.getElementById('nav-menu');
  var desktopQuery = window.matchMedia('(min-width: 961px)');

  function setNav(open, returnFocus) {
    if (!toggle || !navList) return;
    toggle.setAttribute('aria-expanded', String(open));
    navList.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
    if (!open && returnFocus) toggle.focus();
  }

  if (toggle && navList) {
    toggle.addEventListener('click', function () {
      setNav(toggle.getAttribute('aria-expanded') !== 'true', false);
    });

    navList.addEventListener('click', function (e) {
      if (e.target.closest('.nav-link')) setNav(false, false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navList.classList.contains('open')) {
        setNav(false, true);
      }
    });

    var onBreakpoint = function (e) {
      if (e.matches) setNav(false, false);
    };
    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener('change', onBreakpoint);
    } else if (desktopQuery.addListener) {
      desktopQuery.addListener(onBreakpoint);
    }
  }

  // --- Deep-link anchors: copy the full URL on click -----------------------
  document.addEventListener('click', function (e) {
    var link = e.target.closest('.anchor-link');
    if (!link || !navigator.clipboard) return;
    var url = window.location.origin + window.location.pathname + link.getAttribute('href');
    navigator.clipboard.writeText(url).then(function () {
      link.classList.add('copied');
      setTimeout(function () { link.classList.remove('copied'); }, 1600);
    }, function () { /* clipboard denied; the hash navigation still works */ });
  });

  // --- Active nav state on scroll ----------------------------------------
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  if (!('IntersectionObserver' in window) || !navLinks.length) return;

  var linkById = {};
  navLinks.forEach(function (link) {
    linkById[link.getAttribute('href').slice(1)] = link;
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var id = entry.target.id;
      navLinks.forEach(function (link) {
        var isActive = linkById[id] === link;
        link.classList.toggle('active', isActive);
        if (isActive) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  document.querySelectorAll('main > section[id]').forEach(function (section) {
    observer.observe(section);
  });
})();
