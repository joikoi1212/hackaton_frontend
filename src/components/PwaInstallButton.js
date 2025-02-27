import { useState, useEffect } from "react";

export default function PwaInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isFirefox, setIsFirefox] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    setIsFirefox(userAgent.includes("firefox"));
    setIsSafari(/^((?!chrome|android).)*safari/i.test(userAgent));

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <>
      {isFirefox || isSafari ? (
        <div className="mt-2 text-white text-sm bg-gray-800 p-2 rounded">
          ❌ O seu navegador não suporta instalação via botão. 
          <br />Para instalar, vá ao **menu do navegador** e selecione **"Adicionar ao ecrã inicial"**.
        </div>
      ) : (
        <button
          onClick={handleInstallClick}
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Instalar Aplicação
        </button>
      )}
    </>
  );
}
