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

RUN rm -rf ./*

COPY --from=build /app/dist .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
