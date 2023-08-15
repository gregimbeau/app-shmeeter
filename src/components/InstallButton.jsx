import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userPostCountAtom, pwaInstallPromptAtom } from "../state";

function InstallButton() {
  const [userPostCount] = useAtom(userPostCountAtom);
  const [deferredPrompt, setDeferredPrompt] = useAtom(pwaInstallPromptAtom);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const beforeInstallPromptHandler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const appInstalledHandler = () => {
      console.log("PWA was installed");
    };

    window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler);
    window.addEventListener("appinstalled", appInstalledHandler);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        beforeInstallPromptHandler
      );
      window.removeEventListener("appinstalled", appInstalledHandler);
    };
  }, [setDeferredPrompt]);

  useEffect(() => {
    if (userPostCount % 2 === 0 && userPostCount > 0 && deferredPrompt) {
      setIsDismissed(false);
      if (deferredPrompt) {
        setDeferredPrompt(true);
      }
      console.log("Showing install button...");
    }
  }, [userPostCount, isDismissed, deferredPrompt]);

  const handleInstallClick = async () => {
    if (!deferredPrompt || typeof deferredPrompt.prompt !== "function") return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    setDeferredPrompt(null);
  };

  return (
    <div>
      <button
        id='install-button'
        className='install-button'
        onClick={handleInstallClick}
        style={{
          display: deferredPrompt && !isDismissed ? "inline-flex" : "none",
        }}>
        <i className='fas fa-download'></i> Add to Home Screen
      </button>
      <button
        id='dismiss-button'
        className='dismiss-button'
        onClick={() => setIsDismissed(true)}
        style={{
          display: deferredPrompt && !isDismissed ? "inline-flex" : "none",
        }}>
        Dismiss
      </button>
    </div>
  );
}

export default InstallButton;
