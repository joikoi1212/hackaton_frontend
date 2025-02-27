import { useEffect } from "react"; // Importação do hook useEffect
import { useRouter } from "next/router"; // Importação do hook useRouter
import useMessages from "../hooks/useMessages"; // Importação do hook useMessages
import { FiAlertTriangle } from "react-icons/fi"; // Ícone de erro

export default function Custom404() {
  const messages = useMessages();
  const router = useRouter();
  const redirectDelay = 3000; // ⏳ Tempo de espera antes do redirecionamento (3 segundos)

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/auth"); // 🔄 Redireciona automaticamente para a página de login
    }, redirectDelay);

    return () => clearTimeout(timeout); // Limpeza do timeout caso o utilizador saia antes
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6 text-center">
      
      {/* ✅ Ícone animado de erro 404 */}
      <FiAlertTriangle className="text-yellow-400 text-6xl animate-bounce mb-4" />
      
      {/* ✅ Mensagem dinâmica de erro 404 */}
      <h1 className="text-3xl font-bold">{messages.error?.page_not_found}</h1>

      <p className="text-gray-400 mt-2">{messages.error?.redirecting_auth}</p>

      {/* ✅ Barra de progresso do redirecionamento */}
      <div className="w-40 mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
        <div className="w-full h-full bg-yellow-400 animate-pulse"></div>
      </div>

      {/* ✅ Informação sobre o redirecionamento */}
      <p className="text-sm text-gray-500 mt-2">
        Será redirecionado em {redirectDelay / 1000} segundos...
      </p>
    </div>
  );
}