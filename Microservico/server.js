import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import pino from 'pino';

// Configura o Logger para cuspir JSON estruturado 
const logger = pino({
  level: 'info',
  base: { service: 'sorteador-backend-service' } 
});

const app = express();
app.use(cors());
app.use(express.json());

// Rota do Microsserviço que calcula o número
app.get('/api/sortear', (req, res) => {
  // 1. Captura ou cria um ID de correlação para rastreio universal do log
  const correlationId = req.headers['x-correlation-id'] || uuidv4();
  
  const min = Number(req.query.min);
  const max = Number(req.query.max);

  // 2. Validação básica com log de Alerta (WARN)
  if (min >= max) {
    logger.warn({ correlationId, min, max }, "Tentativa de sorteio com intervalo invalido.");
    return res.status(400).json({ error: "Intervalo inválido" });
  }

  // 3. Execução da lógica core do serviço
  const numeroSorteado = Math.floor(Math.random() * (max - min + 1) + min);

  // 4. Emissão do Log Estruturado de Sucesso (INFO)
  logger.info({
    correlationId,
    resultado: numeroSorteado,
    intervalo: `${min} ate ${max}`
  }, "Sorteio realizado com sucesso pelo microsservico.");

  // Retorna o resultado para quem chamou
  res.json({ numero: numeroSorteado, correlationId });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Microsservico de sorteio rodando na porta ${PORT}`);
});