// Este é um exemplo de uma página sem autenticação (pública).
import Image from "next/image";
import { useRouter } from "next/router";

export default function Welcome() {
  const router = useRouter();

  // Retorno da função para renderização do componente (HTML)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Logotipo e título */}
      <div className="flex items-center space-x-4 mb-8">
        <Image src="/nextjs-icon.svg" alt="Next.js Logo" width={60} height={60} />
        <h1 className="text-4xl font-bold text-white">Página do Utilizador</h1>
      </div>

      {/* Área principal do Dashboard */}
      <div className="bg-gray-800 w-full max-w-4xl p-8 rounded-lg shadow-lg border border-gray-700 flex flex-col items-center">
        <p className="text-center text-lg text-gray-300 mb-6">
          Bem-vindo ao Utilizador à sua Página Principal ! 🎉
        </p>

        <button
          onClick={() => router.push("/auth")}
          className="mt-4 bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-all duration-200"
        >
          Voltar ao Login
        </button>
      </div>
    </div>
  );
}