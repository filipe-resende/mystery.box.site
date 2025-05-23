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

# Etapa 2: Deploy com NGINX
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Limpa arquivos padrões do NGINX
RUN rm -rf ./*

# Copia o build da aplicação React
COPY --from=build /app/build .

# Exponha a porta padrão
EXPOSE 80

# Inicia o NGINX
CMD ["nginx", "-g", "daemon off;"]
