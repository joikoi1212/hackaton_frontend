// Compatibilidade de documents - React do your Job :) para cada "End-point"
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt">
      <Head>
        {/* ✅ Charset e compatibilidade */}
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* ✅ Meta Tags para SEO */}
        <meta name="description" content="Aplicação Next.js otimizada para máxima performance e SEO." />
        <meta name="keywords" content="Next.js, Tailwind, React, Web Responsiva, Performance, PWA" />
        <meta name="author" content="N Login" />

        {/* ✅ Configuração PWA */}
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="N Login" />
        <meta name="application-name" content="N Login" />

        {/* ✅ Ícones e Manifest PWA */}
        <link rel="icon" href="/favicon.ico" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon.ico" media="(prefers-color-scheme: dark)" /> 
        {/* PWA icone para App iOS */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        {/* Configuração do PWA Android */}
        <link rel="manifest" href="/site.webmanifest" />

        {/* ✅ Google Fonts (Opcional) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-gray-900 text-white antialiased">
        <Main />
        <NextScript />

        {/* ✅ Registo do Service Worker para PWA */}
        <script>
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').then(reg => {
                  console.log('Service Worker registado com sucesso:', reg);
                }).catch(err => {
                  console.error('Erro ao registar Service Worker:', err);
                });
              });
            }
          `}
        </script>
      </body>
    </Html>
  );
}

