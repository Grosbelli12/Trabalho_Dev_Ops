import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [numAleatorio, setNumAleatorio] = useState(0);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(100);
  const apiKey = import.meta.env.VITE_UPTIME_API_KEY;

  const mudanca1 = (e) => {
    const valor1 = e.target.value;
    const apenasNumeros = valor1.replace(/[^0-9]/g, "");
    setNum1(apenasNumeros);
  };

  const random = () => {
    const randomNumber = Math.floor(Math.random() * (num2 - num1) + num1);
    setNumAleatorio(randomNumber);
  };

  const [statusSite, setStatusSite] = useState("Verificando...");

  useEffect(() => {
    const checarUptime = async () => {
      try {
        const resposta = await fetch(
          "https://api.uptimerobot.com/v2/getMonitors",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `api_key=${apiKey}&format=json`,
          },
        );

        const dados = await resposta.json();
        if (dados.monitors && dados.monitors.length > 0) {
          if (dados.monitors[0].status === 2) {
            setStatusSite("🟢 Online");
          } else {
            setStatusSite("🔴 Offline/Com problemas");
          }
        } else {
          setStatusSite("Monitor não encontrado");
        }
      } catch (erro) {
        console.error("Erro ao buscar logs do Uptime Robot:", erro);
        setStatusSite("Erro na verificação");
      }
    };

    if (apiKey) {
      checarUptime();
    } else {
      setStatusSite("Chave de API não configurada");
    }
  }, [apiKey]);

  return (
    <>
      <h1>Gerador de número aleatório</h1>
      <h2>Selecione o intervalo que deseja gerar o número aleatório</h2>

      <input
        type="number"
        placeholder="Digite o número minimo"
        onChange={mudanca1}
      />
      <input
        type="number"
        placeholder="Digite o número máximo"
        onChange={(e) => setNum2(Number(e.target.value))}
      />

      <h3>{numAleatorio}</h3>

      <button onClick={random}>Gerar número aleatório</button>

      <h2>Status do Sistema</h2>

      <p className="status-text">
        Nosso sistema é monitorado em tempo real. Clique no botão abaixo para
        ver o histórico completo de disponibilidade:
      </p>

      <div className="status-container">
        <a
          href="https://stats.uptimerobot.com/jLbYXZ3fCE"
          target="_blank"
          rel="noopener noreferrer"
          className="status-btn"
        >
          Acessar Painel de Monitoramento 🔗
        </a>
      </div>
    </>
  );
}

export default App;
