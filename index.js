const express = require('express');
require('dotenv').config();
const { dbConnection} = require('./database/config');

// Crear servidor de express
const app = express();

//Base de datos
dbConnection();

//Directorio publico
app.use( express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//rutas
app.use('/api/auth', require('./routes/auth'));
// TODO: CRUD: eventos

//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
});