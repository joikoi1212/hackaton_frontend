import { toast } from "react-toastify";
import { useGallery } from "../context/GalleryContext";

export default function ImageDisplay() {
  const { files, setFiles, loading } = useGallery();

  const deleteFile = async (hash) => {
    const confirmDelete = window.confirm("Tem a certeza que deseja apagar este ficheiro?");
    if (!confirmDelete) return;

    try {
      toast.info("A apagar ficheiro na Blockchain ...");
      const response = await fetch(`/api/pinata?hash=${hash}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao apagar o ficheiro.");
      }

      // Atualizar a galeria localmente
      setFiles((prevFiles) => prevFiles.filter((file) => file.ipfs_pin_hash !== hash));
      toast.success("Ficheiro apagado com sucesso !");
    } catch (error) {
      console.error("Erro ao apagar o ficheiro:", error.message);
      toast.error("Erro ao apagar o ficheiro.");
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p style={{ fontSize: "18px", color: "#555" }}>
          Please Wait a Moment, Blockchain is Synchronizing the Data Storage...
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3>2. Ficheiro Armazenados na Blockchain (IPFS)</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {files.length > 0 ? (
          files.map((file) => (
            <div
              key={file.ipfs_pin_hash}
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                overflow: "hidden",
                textAlign: "center",
              }}
            >
              <img
                src={`https://gateway.pinata.cloud/ipfs/${file.ipfs_pin_hash}`}
                alt={file.metadata?.name || "Imagem"}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
              <button
                onClick={() => deleteFile(file.ipfs_pin_hash)}
                style={{
                  marginTop: "10px",
                  padding: "5px 10px",
                  border: "none",
                  background: "#ff4d4d",
                  color: "#fff",
                  cursor: "pointer",
                  borderRadius: "3px",
                }}
              >
                Apagar
              </button>
            </div>
          ))
        ) : (
          <p>Não há ficheiros disponíveis na Blockchain IPFS.</p>
        )}
      </div>
    </div>
  );
}