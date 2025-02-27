import { useState, useEffect, useRef } from "react"; // Hooks do React
import axios from "axios"; // Biblioteca para requisições HTTP
import Image from "next/image"; // Componente otimizado para imagens
import { ToastContainer, toast } from "react-toastify"; // Biblioteca para mensagens interativas
import "react-toastify/dist/ReactToastify.css"; // Estilos do Toastify
import Input from "../components/ui/Input"; // Componente reutilizável de Input
import Button from "../components/ui/Button"; // Componente reutilizável de Button
import { useRouter } from "next/router"; // Hook de navegação do Next.js
import useMessages from "../hooks/useMessages"; // Hook para mensagens dinâmicas

// Define a URL da API de produção (HTTPS Hosting online)
const API_URL = process.env.NEXT_PUBLIC_APIS_URL_REMOTE;

export default function Register() {
  const messages = useMessages(); // Hook para mensagens traduzidas
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" }); // Estado do formulário
  const router = useRouter(); // Instância do router para navegação
  const emailInputRef = useRef(null); // Referência para focar no input ao carregar
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

  // ✅ Função para capturar a digitação nos inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Função para validar email antes de registar
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // ✅ Função para registar um novo utilizador
  const handleRegister = async (e) => {
    e.preventDefault();

    // ✅ Verificar se os campos foram preenchidos corretamente
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      toast.error(messages.register?.fields_required);
      return;
    }

    // ✅ Validar o email
    if (!validateEmail(formData.email)) {
      toast.error(messages.register?.invalid_email);
      return;
    }

    // ✅ Verificar se as passwords são iguais
    if (formData.password !== formData.confirmPassword) {
      toast.error(messages.register?.password_mismatch);
      return;
    }

    try {
      // 🔹 Envia os dados para a API de registo
      const { data } = await axios.post(
        `${API_URL}/api/register`,
        { username: formData.email, password: formData.password },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success(messages.register?.register_success);
      setTimeout(() => router.push("/auth"), 1000);
    } catch (error) {
      let errorMessage = messages.register?.register_error;

      if (error.response) {
        errorMessage = error.response.data?.error || messages.register?.register_error;
      } else if (error.request) {
        errorMessage = messages.auth?.network_error;
      } else {
        errorMessage = error.message;
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

      {/* ✅ Formulário de registo */}
      {!isLoading && (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-700 flex flex-col items-center">
          
          {/* ✅ Logo e título */}
          <div className="flex items-center space-x-3 mb-4">
            <Image src="/nextjs-icon.svg" alt="Next.js Logo" width={40} height={40} />
            <h2 className="text-2xl font-semibold">{messages.register?.title}</h2>
          </div>

          {/* ✅ Formulário */}
          <form onSubmit={handleRegister} className="w-full">
            <Input
              label={messages.register?.email_label}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              ref={emailInputRef}
            />
            <Input 
              label={messages.register?.password_label} 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
            />
            <Input 
              label={messages.register?.confirm_password_label} 
              type="password" 
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
            />

            {/* ✅ Botão de registo com efeito hover */}
            <Button text={messages.register?.register_button} className="w-full transition-transform transform hover:scale-105" />
          </form>

          {/* ✅ Link para voltar ao login */}
          <p className="text-center text-sm mt-4">
            {messages.register?.account_exists}{" "}
            <a onClick={() => router.push("/auth")} className="text-blue-400 hover:underline cursor-pointer">
              {messages.auth?.login_title}
            </a>
          </p>
        </div>
      )}

      {/* ✅ Mensagens interativas */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}