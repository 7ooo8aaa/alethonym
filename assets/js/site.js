/* ALETHONYM — minimal progressive enhancement. No dependencies, no external calls. */
(function () {
  "use strict";

  /* Mobile navigation toggle */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    document.documentElement.classList.add("nav-ready");
  }

  /* Current year in the footer */
  var y = document.querySelector("[data-year]");
  if (y) { y.textContent = String(new Date().getFullYear()); }

  /* Content remains visible without JavaScript; no reveal dependency. */

  /* CTA click measurement (GA4) — additive only.
     Does not touch the affiliate href, target, rel, or the A8.net tracking
     pixel <img> in any way; only reports which CTA position was clicked so
     top / middle / bottom placement can be compared later. Fails silently
     if gtag isn't loaded (e.g. ad blockers) — never blocks navigation. */
  document.addEventListener("click", function (e) {
    var el = e.target.closest ? e.target.closest("[data-cta-position]") : null;
    if (!el) { return; }
    if (typeof window.gtag === "function") {
      try {
        window.gtag("event", "trifa_click", {
          cta_position: el.getAttribute("data-cta-position") || "unknown",
          cta_service: el.getAttribute("data-cta-service") || "trifa",
          page_path: location.pathname
        });
      } catch (err) { /* measurement must never block the outbound click */ }
    }
  }, true);
})();
