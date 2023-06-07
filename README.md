# Rest server typescript+express.js

Este proyecto tiene como objetivo poner en práctica los conocimientos de express.js + typescript, creando un servicio rest que incluye: 

- Autenticación de usuarios mediante json web token(jwt).
- Uso de mongoose para consultar base de datos MongoDB 
- Subida de archivos mediante express-fileuploader
- Validaciones request usando express-validator
- Gestión de usuarios
- Documentación de apis en swagger(en proceso).

###  Desplegar proyecto en servidor de desarrollo

- Estando en la raíz del proyecto ejecutar en una terminal lo siguiente
``cp env.example .env`` cambiar variables de .env según corresponda.

- Instalar los paquetes necesarios(ejecutar solo uno de los siguientes comandos)
``npm install``
``npm i``

- Instalar typescrpt de forma global(en caso de no tenerlo)
``npm install -g typescript``

- Compilar archivos de typescript(se creará un directorio llamado dist)
<sub><sup>Abrir una nueva terminal estando en la raíz del proyecto</sup></sub>
``tsc -w``

- Ejecutar el proyecto en ambiente de desarrollo
<sub><sup>Sin dejar de ejecutar tsc -w en otra terminal ejecutar</sup></sub>
``npm run dev``