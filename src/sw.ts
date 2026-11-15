import { registerSW } from 'virtual:pwa-register';

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    registerSW({
      immediate: true,
      onNeedRefresh() {
        console.log('New content available, please refresh.');
        // In a full app, you would show a toast here
      },
      onOfflineReady() {
        console.log('App is ready to work offline.');
      }
    });
  }
}
