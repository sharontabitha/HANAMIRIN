import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';

export default function InstallButton() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(
    () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true
  );
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const handleInstallPrompt = event => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    const handleAppInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
      setShowInstructions(false);
    };

    window.addEventListener('beforeinstallprompt', handleInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  async function installApp() {
    if (!installPrompt) {
      setShowInstructions(value => !value);
      return;
    }

    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === 'accepted') setInstallPrompt(null);
  }

  if (installed) return null;

  return (
    <div className="pwa-install">
      {showInstructions && (
        <div className="pwa-install-help" role="status">
          <button
            className="pwa-install-close"
            type="button"
            aria-label="Close install instructions"
            onClick={() => setShowInstructions(false)}
          >
            <X size={15} />
          </button>
          <b>Install Hanami</b>
          <span>
            { /iPhone|iPad|iPod/i.test(navigator.userAgent)
              ? 'In Safari, tap Share, then Add to Home Screen.'
              : 'Open your browser menu and choose Install app or Add to Home Screen.'}
          </span>
        </div>
      )}
      <button className="pwa-install-button" type="button" onClick={installApp}>
        <Download size={16} />
        Install app
      </button>
    </div>
  );
}
