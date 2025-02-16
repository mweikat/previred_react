# 📖 Instrucciones para ejecutar el Frontend (React)

## 📌 Requisitos
Antes de ejecutar el proyecto, asegúrate de tener instalado:
- **Node.js 18+** (Se recomienda la última versión LTS)
- **npm** (Se instala con Node.js)
- **Git** (Opcional, para clonar el repositorio)

---

## 🚀 Instalación y ejecución

### 1️⃣ Clonar el repositorio (si no lo has hecho)
Si aún no tienes el código en tu máquina, clónalo con:
```sh
git clone <URL_DEL_REPOSITORIO>
cd frontend
```
### 2️⃣ Intallar dependencias
```sh
npm install
```
### 3️⃣3️ Ejecutar Aplicacion

📖 Instrucciones para ejecutar el frontend en producción
Este documento describe cómo ejecutar la aplicación React en un entorno de producción sin el uso de Docker.

🔹 1. Generar los archivos de producción
Ejecuta el siguiente comando en la raíz del proyecto React:

sh
Copiar
Editar
npm run build
Esto generará una carpeta dist/ con los archivos estáticos optimizados para producción.

🔹 2. Servir los archivos estáticos en producción
Opción 1: Usar serve (Rápido y sencillo)
Si solo necesitas levantar la aplicación en un servidor local:

Instala serve (si no lo tienes):

sh
Copiar
Editar
npm install -g serve
Ejecuta el siguiente comando dentro del proyecto:

sh
Copiar
Editar
serve -s dist -l 3000
Accede a la aplicación en http://localhost:3000.

Opción 2: Usar un servidor web (NGINX o Apache)
Si vas a desplegar la aplicación en un servidor, la mejor opción es usar NGINX.

1️⃣ Instalar NGINX (Linux)
Ejecuta:

sh
Copiar
Editar
sudo apt update && sudo apt install nginx -y
2️⃣ Copiar los archivos de dist/ al servidor
sh
Copiar
Editar
sudo cp -r dist/* /var/www/html/
3️⃣ Configurar NGINX
Edita el archivo de configuración:

sh
Copiar
Editar
sudo nano /etc/nginx/sites-available/default
Reemplaza el contenido con:

nginx
Copiar
Editar
server {
    listen 80;
    server_name dominio.com;

    root /var/www/html;
    index index.html;
    location / {
        try_files $uri /index.html;
    }
}
Guarda los cambios (CTRL + X, luego Y, luego Enter).

4️⃣ Reiniciar NGINX
sh
Copiar
Editar
sudo systemctl restart nginx
La aplicación estará disponible en http://tu-servidor-ip o http://dominio.com.

🚀 Conclusión
Para desarrollo:
sh
Copiar
Editar
npm run dev
Para producción:
sh
Copiar
Editar
npm run build
Luego, usa serve o NGINX para servir la aplicación.

