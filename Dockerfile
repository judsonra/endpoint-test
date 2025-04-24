# Usa uma imagem oficial do Node.js
FROM node:18-alpine

# Define diretório de trabalho no contêiner
WORKDIR /app

# Copia os arquivos do projeto para o contêiner
COPY package*.json ./
COPY . .

# Instala as dependências
RUN npm install

# Expõe a porta da API
EXPOSE 3000

# Comando padrão ao iniciar o contêiner
CMD ["node", "app.js"]
