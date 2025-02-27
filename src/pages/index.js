import { useEffect } from "react"; // Importação do hook useEffect
import { useRouter } from "next/router"; // Importação do hook useRouter
import useMessages from "../hooks/useMessages"; // Importação do hook useMessages 

// Função Home
export default function Home() {
  const messages = useMessages();
  const router = useRouter();

  // Utilização do hook useEffect
  useEffect(() => {
    router.replace("/auth"); // Redireciona para a página de login automaticamente
  }, []);

  // Retorno da função para renderização do componente (HTML)
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <p>{messages.button?.loading || "Loading..."}</p>
    </div>
  );
}
