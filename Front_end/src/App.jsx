import "./App.css";
import { useState, useEffect } from "react";
import { logger } from "./utils/logger";

function App() {
  const [numAleatorio, setNumAleatorio] = useState(0);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(100);
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    logger.info("Aplicação do Sorteador iniciada com sucesso.");
  }, []);

  const tratarNum1 = (e) => {
    const valor = e.target.value;
    const apenasNumeros = valor.replace(/[^0-9]/g, "");
    setNum1(Number(apenasNumeros));
  };

  const tratarNum2 = (e) => {
    const valor = e.target.value;
    const apenasNumeros = valor.replace(/[^0-9]/g, "");
    setNum2(Number(apenasNumeros));
  };

  const random = async () => {
  try {
    // Geramos um ID único no front para passar para o microsserviço acompanhar
    const correlationId = crypto.randomUUID();

    logger.info(`Disparando requisicao HTTP para o microsservico. ID: ${correlationId}`);

    const response = await fetch(`http://localhost:3001/api/sortear?min=${num1}&max=${num2}`, {
      headers: {
        'x-correlation-id': correlationId 
      }
    });

    if (!response.ok) {
      throw new Error("Erro na resposta do microsserviço");
    }

    const dados = await response.json();

    setNumAleatorio(dados.numero);
    setHistorico((historicoAntigo) => [dados.numero, ...historicoAntigo]);
    
    logger.info(`Resposta recebida do microsservico com sucesso.`);

  } catch (error) {
    logger.error("Falha ao conectar com o microsservico de sorteio.", error);
    alert("Não foi possível conectar ao servidor de sorteio.");
  }
};

  return (
    <div className="layout-container">
      <aside className="sidebar-historico">
        <h2>Histórico</h2>
        {historico.length === 0 ? (
          <p className="vazio-text">Nenhum número sorteado ainda.</p>
        ) : (
          <ul className="lista-historico">
            {historico.map((num, index) => (
              <li key={index} className="item-historico">
                {index === 0 ? `⭐ ${num} (Último)` : num}
              </li>
            ))}
          </ul>
        )}
      </aside>
      <main className="conteudo-principal">
        <h1>Gerador de número aleatório</h1>
        <h2>Selecione o intervalo que deseja gerar o número aleatório</h2>

        <div className="inputs-group">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Digite o número mínimo"
            value={num1 === 0 ? "" : num1}
            onChange={tratarNum1}
          />
          <input
            type="text"
            inputMode="numeric"
            placeholder="Digite o número máximo"
            value={num2 === 100 ? "" : num2}
            onChange={tratarNum2}
          />
        </div>

        <h3>{numAleatorio}</h3>

        <button onClick={random}>Gerar número aleatório</button>

        <hr className="divisor" />

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
      </main>
    </div>
  );
}

export default App;
