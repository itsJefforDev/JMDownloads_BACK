# Usa una imagen oficial de Node con Python preinstalado
FROM node:18-bullseye

# Instala Python pip y yt-dlp
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    pip3 install yt-dlp

# Crea directorios y copia archivos
WORKDIR /app
COPY . .

# Instala dependencias del backend
RUN npm install

# Expón el puerto del servidor (ajústalo si es diferente)
EXPOSE 4000

# Comando de inicio
CMD ["node", "server.js"]
