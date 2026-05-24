export const logger = {
  info: (mensagem, contexto = "") => {
    const timestamp = new Date().toISOString();
    console.log(
      `%c[INFO] [${timestamp}] ${mensagem}`, 
      "color: #58a6ff; font-weight: bold;", 
      contexto
    );
  },

  warn: (mensagem, contexto = "") => {
    const timestamp = new Date().toISOString();
    console.warn(
      `%c[WARN] [${timestamp}] ${mensagem}`, 
      "color: #f0883e; font-weight: bold;", 
      contexto
    );
  },

  error: (mensagem, erro = "") => {
    const timestamp = new Date().toISOString();
    console.error(
      `%c[ERROR] [${timestamp}] ${mensagem}`, 
      "color: #f85149; font-weight: bold;", 
      erro
    );
  }
};