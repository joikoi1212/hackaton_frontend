// Compatibilidade de documents - React do your Job :) para cada "End-point"
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt">
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Aplicação Next.js" />
        <meta name="keywords" content="Next.js, Tailwind, React" />
        <meta name="author" content="Projeto" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-gray-900 text-white antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
