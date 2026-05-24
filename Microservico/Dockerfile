# 1. Escolhe uma imagem leve do Node.js como base
FROM node:18-alpine

# 2. Define a pasta de trabalho dentro do container
WORKDIR /app

# 3. Copia os arquivos de dependências primeiro (para otimizar o cache)
COPY package*.json ./

# 4. Instala apenas as dependências necessárias para rodar o app
RUN npm install --production

# 5. Copia o restante dos arquivos do seu microsserviço
COPY . .

# 6. Informa a porta que o container vai expor (geralmente a 3001 para o back)
EXPOSE 3001

# 7. Comando para iniciar o servidor Node
CMD ["node", "server.js"]