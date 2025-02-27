import { useState, useEffect, useRef } from "react"; // Hooks do React
import Image from "next/image"; // Componente otimizado para imagens
import { ToastContainer, toast } from "react-toastify"; // Biblioteca para mensagens interativas
import "react-toastify/dist/ReactToastify.css"; // Estilos do Toastify
import Input from "../components/ui/Input"; // Componente reutilizável de Input
import Button from "../components/ui/Button"; // Componente reutilizável de Button
import { useRouter } from "next/router"; // Hook de navegação do Next.js
import useMessages from "../hooks/useMessages"; // Hook para mensagens dinâmicas

export default function RecoverPassword() {
  const messages = useMessages(); // Hook para mensagens traduzidas
  const [email, setEmail] = useState(""); // Estado para armazenar o email
  const router = useRouter(); // Instância do router para navegação
  const emailInputRef = useRef(null); // Referência para focar o input ao carregar
  const [isLoading, setIsLoading] = useState(true); // Estado para loading inicial

  // ✅ Focar no input ao carregar a página e simular um carregamento inicial
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simula um pequeno carregamento antes de mostrar o conteúdo
  }, []);

  // ✅ Função para capturar a digitação no input de email
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // ✅ Função para submeter o pedido de recuperação de password
  const handleRecover = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(messages.recover?.recover_success);
      } else {
        toast.error(data.message || messages.recover?.recover_error);
      }
    } catch (error) {
      let errorMessage = messages.recover?.recover_error;
      if (error.message.includes("Network Error")) {
        errorMessage = messages.auth?.network_error; // Usa a mesma mensagem do login
      }
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white relative">
      
      {/* ✅ Ecrã de carregamento antes de exibir o formulário */}
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-white mb-4"></div>
          <p className="text-lg font-semibold text-white">A carregar...</p>
        </div>
      )}

      {/* ✅ Formulário de recuperação de senha */}
      {!isLoading && (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-700 flex flex-col items-center">
          
          {/* ✅ Logo e título */}
          <div className="flex items-center space-x-3 mb-4">
            <Image src="/nextjs-icon.svg" alt="Next.js Logo" width={40} height={40} />
            <h2 className="text-2xl font-semibold">{messages.recover?.title}</h2>
          </div>

          {/* ✅ Formulário */}
          <form onSubmit={handleRecover} className="w-full">
            <Input
              label={messages.recover?.email_label}
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              ref={emailInputRef}
            />
            
            {/* ✅ Botão de recuperação com animação */}
            <Button text={messages.recover?.recover_button} className="w-full transition-transform transform hover:scale-105" />

            {/* ✅ Link para voltar ao login */}
            <p className="text-center text-sm mt-4">
              {messages.recover?.remember_password}{" "}
              <a 
                onClick={() => router.push("/auth")} 
                className="text-blue-400 hover:underline cursor-pointer"
              >
                {messages.auth?.login_title}
              </a>
            </p>
          </form>
        </div>
      )}

      {/* ✅ Mensagens interativas */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}