const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config(); //dotenv para configurar las variables de entorno

//console.log( process.env.PORT );

//Creamos server express
const app = express();

//bASE DE DATOS
dbConnection();

//Cors (que cualquiera pueda usar nuestra api)
app.use(cors())

//Directorio Publico
app.use( express.static('public') ) //Apuntamos a la carpeta public

//Lectura y parseo del body
app.use( express.json() );

//Rutas
app.use('/api/auth', require('./routes/auth') ); //Importamos las rutas del auth
app.use('/api/events', require('./routes/events') );

//Escuchar Peticiones
app.listen( process.env.PORT, () => {
    console.log("server 4000");
})