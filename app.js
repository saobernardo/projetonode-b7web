const { Router } = require("express");

const express = require('express');

//Rotas
const routes = express.Router();

routes.get('/', (request, response)=>{
    response.send("Hello world");
});

//Configurações

const app = express();
app.use('/', routes);

//exportando a app
module.exports = app;