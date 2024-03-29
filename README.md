# Iniciar package.jason

npm init -y
npm i express
npm i express dotenv - configurar variables de entorno

# crear web server

https://www.npmjs.com/package/express
copiar el primer codigo que aparece y pegarlo en app.js

ejecutar
nodemon app

abrir exprorador con http://localhost:3000/

configurar variable de entorno
crar .env agregar PORT=8080

agregar require('dotenv').config()

cambiar app.listen(3000) por app listen(process.env.PORT)

configurar public
# backend_express
