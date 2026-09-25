(function () {
  // All the visual hover/focus behavior (dimming, desaturating,
  // widening, the gold border) is handled entirely in home.css via
  // :hover/:focus-visible -- this just wires up navigation. Only the
  // Vanilla column goes anywhere; Burning Crusade and Wrath of the
  // Lich King are placeholders for now and do nothing on click.

  // Single source of truth for the click-to-navigate delay: change
  // this one number and both the fullscreen expand animation (via the
  // --expand-duration custom property set below) and the setTimeout
  // that waits for it to finish stay in sync automatically.
  const EXPAND_DURATION_MS = 1000;

  const group = document.querySelector(".expansion-select");

  document.querySelectorAll(".expansion-column").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.expansion === "vanilla") {
        if (group) {
          group.style.setProperty("--expand-duration", EXPAND_DURATION_MS + "ms");
          group.classList.add("is-expanding");
        }
        btn.classList.add("expanding");

        setTimeout(() => {
          window.location.href = "character-select.html";
        }, EXPAND_DURATION_MS);
      }
    });
  });
})();