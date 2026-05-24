import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [numAleatorio, setNumAleatorio] = useState(0);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(100);

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

  const random = () => {
    const randomNumber = Math.floor(Math.random() * (num2 - num1 + 1) + num1);
    setNumAleatorio(randomNumber);
  };

  return (
    <>
      <h1>Gerador de número aleatório</h1>
      <h2>Selecione o intervalo que deseja gerar o número aleatório</h2>

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
