import { createContext, useState, useContext, useEffect } from "react";

const GalleryContext = createContext();

export function GalleryProvider({ children }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshSignal, setRefreshSignal] = useState(false);
  const [message, setMessage] = useState("");

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/pinata?timestamp=${new Date().getTime()}`);
      if (response.ok) {
        const data = await response.json();
        setFiles(data);
      } else {
        console.error("Erro ao buscar os ficheiros.");
        setFiles([]);
      }
    } catch (error) {
      console.error("Erro ao buscar os ficheiros:", error.message);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  const triggerRefresh = () => setRefreshSignal((prev) => !prev);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  useEffect(() => {
    fetchFiles();
  }, [refreshSignal]);

  return (
    <GalleryContext.Provider value={{ files, setFiles, loading, triggerRefresh, message, showMessage }}>
      {children}
    </GalleryContext.Provider>
  );
}

export function useGallery() {
  return useContext(GalleryContext);
}
