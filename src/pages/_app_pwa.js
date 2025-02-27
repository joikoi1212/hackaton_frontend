import { useEffect } from "react";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("✔ Service Worker registado!"))
        .catch((err) => console.error("❌ Erro no Service Worker:", err));
    }
  }, []);

  return <Component {...pageProps} />;
}

