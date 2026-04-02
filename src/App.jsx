import "./App.css";
import { useState } from "react";

function App() {
  
  const [numAleatorio, setNumAleatorio] = useState(0);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(100);

  const random = () => {
    const randomNumber = Math.floor(Math.random() * (num2 - num1) + num1);
    setNumAleatorio(randomNumber);
  };
  return (
    <>
      <h1>Gerador de número aleatório</h1>
      <h2>Selecione o intervalo que deseja gerar o número aleatório</h2>

      <input
        type="number"
        placeholder="Digite o número minimo"
        onChange={(e) => setNum1(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Digite o número máximo"
        onChange={(e) => setNum2(Number(e.target.value))}
      />

      <h3>{numAleatorio}</h3>

      <button onClick={random}>Gerar número aleatório</button>
    </>
  );
}

export default App;
