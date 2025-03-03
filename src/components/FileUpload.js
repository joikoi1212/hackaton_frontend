import { useState, useRef } from "react";
import { useGallery } from "../context/GalleryContext";
import { toast } from "react-toastify";

export default function FileUpload() {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { triggerRefresh } = useGallery();

  const handleUpload = async () => {
    const file = fileInputRef.current?.files[0];

    if (!file) {
      toast.warn("Por favor, selecione um ficheiro para carregar!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      toast.info("A carregar ficheiro na Blockchain ...");
      const response = await fetch("/api/pinata", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao carregar o ficheiro.");
      }

      toast.success("Ficheiro carregado com sucesso na Blockchain.");
      triggerRefresh(); // Atualiza a galeria após upload
    } catch (error) {
      console.error("Erro ao carregar o ficheiro:", error.message);
      toast.error("Erro ao carregar o ficheiro.");
    } finally {
      setLoading(false);
      fileInputRef.current.value = ""; // Resetar o campo de input
    }
  };

  return (
    <div>
      <h3>1. Upload de Ficheiros "Localhost" para Blockchain (IPFS)</h3>
      <input type="file" ref={fileInputRef} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "A carregar..." : "Upload do ficheiro na Blockchain (IPFS)"}
      </button>
    </div>
  );
}

