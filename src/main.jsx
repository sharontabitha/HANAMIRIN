import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './style.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  let reloading = false;
  let updatePromptDismissed = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloading) return;
    reloading = true;
    window.location.reload();
  });

  async function register() {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        updateViaCache: 'none'
      });

      function offerUpdate() {
        if (!registration.waiting || !navigator.serviceWorker.controller || updatePromptDismissed) return;
        if (window.confirm('A new version of Hanami is ready. Reload to update now?')) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        } else {
          updatePromptDismissed = true;
        }
      }

      registration.addEventListener('updatefound', () => {
        const installing = registration.installing;
        if (!installing) return;
        installing.addEventListener('statechange', () => {
          if (installing.state === 'installed') offerUpdate();
        });
      });

      offerUpdate();
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState !== 'visible') return;
        registration.update().then(offerUpdate).catch(error => {
          console.error('Could not check for a Hanami update.', error);
        });
      });
    } catch (error) {
      console.error('Could not register the Hanami offline app.', error);
    }
  }

  if (document.readyState === 'complete') {
    register();
  } else {
    window.addEventListener('load', register, { once: true });
  }
}

registerServiceWorker();
