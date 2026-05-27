FROM node:20-alpine

# Definindo o diretório dentro do container
WORKDIR /app

COPY package*.json ./

RUN npm install --ignore-scripts

COPY . .

# Vai utilizar a porta 3000 dentro do container
EXPOSE 3000

# Comandos importantes para não deixar a aplicação morrer no container
CMD ["npm", "start"]
