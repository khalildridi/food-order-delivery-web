# Étape 1 : Construire l'application
FROM node:16-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN npm run build

# Étape 2 : Servir l'application avec un serveur web léger
FROM nginx:stable-alpine

# Copie du build React vers le dossier public de Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copie d'un fichier Nginx custom si besoin (optionnel)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
