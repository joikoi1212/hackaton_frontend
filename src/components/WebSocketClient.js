import { useEffect, useState, useRef } from "react";

const WebSocketClient = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [recipient, setRecipient] = useState(""); 
  const [username, setUsername] = useState(""); // Nome do utilizador (ex: USER1, USER2)
  const [users, setUsers] = useState([]); // Lista de utilizadores conectados
  const [isConnected, setIsConnected] = useState(false); // Define se o utilizador está conectado
  const ws = useRef(null);
  const WS_URL = "wss://railwaywebsocket-production.up.railway.app:8080";

  const connectToServer = () => {
    console.log(isConnected);
    if (!isConnected) {
      ws.onopen = () => console.log("✅ Connected!");
      ws.onerror = (error) => console.error("❌ WebSocket error", error);
      ws.onclose = () => console.log("🔌 Disconnected.");
      ws.current = new WebSocket(WS_URL);

      ws.current.onopen = () => {
        console.log("Conectado ao servidor WebSocket");
        setIsConnected(true);
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "ASSIGN_USERNAME") {
          setUsername((prevUsername) => prevUsername || data.username); // Define apenas uma vez
        } else if (data.type === "USER_LIST") {
          atualizarListaUtilizadores(data.users);
        } else {
          // Se a mensagem veio do próprio utilizador, mostrar "Eu"
          const senderName = data.sender === username ? "Eu" : data.sender;
          setMessages((prev) => [...prev, `${senderName}: ${data.message}`]);
        }
      };

      ws.current.onclose = () => {
        console.log("Desconectado do servidor WebSocket");
        setIsConnected(false);
        setUsername(""); // Remove o nome do utilizador ao desconectar
        setUsers([]); // Limpa a lista de utlizadores
      };
    }
  };

  // Função para atualizar a dropdown manualmente e remover o próprio nome da lista
  const atualizarListaUtilizadores = (lista) => {
    const filteredUsers = lista.filter(user => user !== username); // Remove o próprio utilizador
    setUsers(filteredUsers);
  };

  // Enviar mensagem para o destinatário selecionado
  const sendMessage = () => {
    if (input && recipient && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ recipient, message: input }));
      setInput(""); // Limpa o campo de texto após enviar
    }
  };

  // Solicitar lista de utilizadores ao servidor
  const refreshUsers = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: "REQUEST_USER_LIST" }));
    }
  };

  // Função para capturar tecla "Enter" e enviar mensagem
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Evita quebra de linha no input
      sendMessage();
    }
  };

  return (
    <div>
      <h2>WebSocket Chat Privado</h2>

      {!isConnected ? (
        <button onClick={connectToServer}>Conectar</button>
      ) : (
        <p><strong>O seu nome de utilizador:</strong> {username}</p>
      )}

      {isConnected && (
        <>
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>

          {/* Botão para atualizar lista de utilizadores */}
          {/*<button onClick={refreshUsers}>Atualizar Lista</button>*/}

          {/* Dropdown para escolher o destinatário */}
          <select value={recipient} onChange={(e) => setRecipient(e.target.value)}>
            <option value="">Selecione um destinatário</option>
            {users.length > 0 ? (
              users.map((user) => (
                <option key={user} value={user}>{user}</option>
              ))
            ) : (
              <option disabled>Nenhum utilizador disponível</option>
            )}
          </select>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress} // Captura tecla "Enter"
            placeholder="Digite uma mensagem"
          />
          <button onClick={sendMessage} disabled={!recipient}>Enviar</button>
        </>
      )}
    </div>
  );
};

export default WebSocketClient;