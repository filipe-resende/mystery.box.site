# Etapa 1: Build
FROM node:20 AS build

WORKDIR /app

# Copia arquivos de dependências
COPY package.json yarn.lock ./

# Instala dependências
RUN yarn install

# Copia o restante do código
COPY . ./

# Compila o projeto
RUN yarn build

# Copia o build da aplicação React
COPY --from=build /app/build .