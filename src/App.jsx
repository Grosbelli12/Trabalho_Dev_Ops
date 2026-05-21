import "./App.css";
import { useState, useEffect } from "react";

function App() {
  // Microserviço - logs - pipeline - tracing - monitoramento verificador de saude que vou adicionar o meu projeto no uptime robot

  const [numAleatorio, setNumAleatorio] = useState(0);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(100);
  const apiKey = import.meta.env.VITE_UPTIME_API_KEY; // Substitua pela sua chave de API do Uptime Robot
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

        if (dados.monitors[0].status === 2) {
          setStatusSite("🟢 Online");
        } else {
          setStatusSite("🔴 Offline/Com problemas");
        }
      } catch (erro) {
        console.error("Erro ao buscar logs do Uptime Robot:", erro);
        setStatusSite("Erro na verificação");
      }
    };
git pull origin dev
    checarUptime();
  }, []);

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
      <iframe
        src="https://stats.uptimerobot.com/jLbYXZ3fCE"
        width="100%"
        height="400px"
        style={{ border: "none", borderRadius: "8px" }}
      />
    </>
  );
}

