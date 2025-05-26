# Docker Setup pour Memory App

Cette application React est dockerisée avec plusieurs options de déploiement.

## 🚀 Démarrage rapide

### Développement
```powershell
# Construire et lancer le conteneur de développement
docker-compose up memory-dev

# Ou avec rebuild
docker-compose up --build memory-dev
```

L'application sera accessible sur http://localhost:5173

### Production
```powershell
# Construire et lancer le conteneur de production
docker-compose --profile production up memory-prod

# Ou alternative avec Nginx sur le port 8080
docker-compose --profile nginx up memory-nginx
```

L'application sera accessible sur http://localhost:80 (ou http://localhost:8080 pour nginx)

## 🛠️ Commandes Docker

### Construction manuelle
```powershell
# Image de développement
docker build --target development -t memory-app:dev .

# Image de production
docker build --target production -t memory-app:prod .
```

### Lancement manuel
```powershell
# Développement
docker run -p 5173:5173 -v ${PWD}:/app -v /app/node_modules memory-app:dev

# Production
docker run -p 80:80 memory-app:prod
```

## 📁 Structure Docker

- **Dockerfile** : Multi-stage build (development/production)
- **docker-compose.yml** : Configuration pour développement et production
- **nginx.conf** : Configuration Nginx pour la production
- **.dockerignore** : Fichiers à exclure de l'image Docker

## 🔧 Configuration

### Développement
- Hot reload activé
- Port : 5173
- Volume monté pour les modifications en temps réel

### Production
- Application buildée avec Vite
- Servie par Nginx
- Optimisations de cache et compression
- Port : 80

## 🐛 Dépannage

### Le hot reload ne fonctionne pas
Assurez-vous que `usePolling: true` est configuré dans vite.config.js

### Erreur de permissions
```powershell
# Sur Windows, assurez-vous que Docker Desktop fonctionne
# Redémarrez Docker Desktop si nécessaire
```

### L'application n'est pas accessible
Vérifiez que les ports ne sont pas déjà utilisés :
```powershell
netstat -an | findstr :5173
netstat -an | findstr :80
```
