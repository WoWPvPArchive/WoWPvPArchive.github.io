(function () {
  // All the visual hover/focus behavior (dimming, desaturating,
  // widening, the gold border) is handled entirely in home.css via
  // :hover/:focus-visible -- this just wires up navigation. Only the
  // Vanilla column goes anywhere; Burning Crusade and Wrath of the
  // Lich King are placeholders for now and do nothing on click.
  document.querySelectorAll(".expansion-column").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.expansion === "vanilla") {
        window.location.href = "character-select.html";
      }
    });
  });
})();