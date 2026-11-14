// Keep module startup failures visible instead of leaving a blank research pane.
(() => {
  const explain = () => {
    if (document.documentElement.dataset.morsAppReady === 'true') return;
    const content = document.getElementById('content');
    if (content) {
      content.innerHTML =
        '<div class="callout warn"><h2>MORS AEGIS could not start</h2><p>The page loaded, but its interface script did not finish. Open this link in Chrome or Safari, then refresh. If it still fails, send this screen to support.</p><button class="outline-btn" type="button" onclick="location.reload()">Reload</button></div>';
    }
  };
  window.addEventListener('error', explain);
  window.addEventListener('unhandledrejection', explain);
  window.setTimeout(explain, 12000);
})();
