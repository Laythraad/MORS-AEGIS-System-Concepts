// Keep startup failures visible without mistaking a slow mobile connection for one.
(() => {
  const explain = () => {
    if (document.documentElement.dataset.morsAppReady === 'true') return;
    const content = document.getElementById('content');
    if (content) {
      content.innerHTML =
        '<div class="callout warn"><h2>MORS AEGIS is taking longer than expected</h2><p>Check your connection and reload. If you opened this page inside another app, open it in your browser.</p><button class="outline-btn" id="boot-reload" type="button">Reload</button></div>';
      content.querySelector('#boot-reload')?.addEventListener('click', () => location.reload());
    }
  };
  window.addEventListener('error', explain);
  window.addEventListener('unhandledrejection', explain);
  window.setTimeout(explain, 45000);
})();
