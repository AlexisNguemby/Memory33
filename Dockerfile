# Dockerfile multi-stage pour application React avec Vite

# Stage 1: Build de l'application
FROM node:18-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration des packages
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production=false

# Copier le code source
COPY . .

# Construire l'application pour la production
RUN npm run build

# Stage 2: Serveur de production avec Nginx
FROM nginx:alpine AS production

# Copier les fichiers construits depuis le stage builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copier la configuration Nginx personnalisée (optionnel)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Commande par défaut
CMD ["nginx", "-g", "daemon off;"]

# Stage alternatif: Serveur de développement
FROM node:18-alpine AS development

WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./

# Installer toutes les dépendances (dev + prod)
RUN npm ci

# Copier le code source
COPY . .

# Exposer le port de développement Vite
EXPOSE 5173

# Commande pour le mode développement
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
