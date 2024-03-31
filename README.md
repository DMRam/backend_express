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

# OCI config - deploy

Crear compute instance - Virtual Machine
completar
name
primary VNIC information (New virtual cloud network name)
New virtual cloud network name
New subnet name
Save private key

    Create

# Connect with OCI Instance machine

execute
chmod 600 /Users/dannymunoz/Documents/Danny/UNAB/2024/Desarrollo/Privatekey/ssh-key-2024-03-30.key (To protect key)

ssh -i /Users/dannymunoz/Documents/Danny/UNAB/2024/Desarrollo/Privatekey/ssh-key-2024-03-30.key opc@151.145.35.253
