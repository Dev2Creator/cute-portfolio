export function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || import.meta.env.DEV) return;

  window.addEventListener("load", () => {
    void navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {
      // Offline support is progressive enhancement; the portfolio remains usable without it.
    });
  });
}