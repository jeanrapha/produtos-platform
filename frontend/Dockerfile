# Usando una imagen base de Nginx en Alpine Linux
FROM nginx:alpine

# Copiando os arquivos do frontend para o diretório padrão do Nginx
COPY . /usr/share/nginx/html

# Configura a porta do Nginx para 81
#RUN sed -i 's/listen\s\+80;/listen 81;/' /etc/nginx/conf.d/default.conf

# Expondo a porta 81 para acesso ao frontend
#EXPOSE 81   

# Comando para iniciar o Nginx
#CMD ["nginx", "-g", "daemon off;"]