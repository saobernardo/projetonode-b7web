const express = require("express");
const mustache = require('mustache-express');
const mainRoutes = require("./routes/index");
const helper = require('./helpers');
const errorHandler = require('./handlers/errorHandler');

//Configurações
const app = express();
//antes do router, usa-se o helper
app.use((req, res, next)=>{
    //res.locals está criando variáveis globais
    res.locals.h = helper;
    //a próxima página acessada terá essas informações
    next();
});

app.use(express.json());
//rotas principais
app.use('/', mainRoutes);
//Não encontrada
app.use(errorHandler.notFound);

//configurando Template Engine
app.engine('mst', mustache(__dirname+'/views/partials', '.mst'));
app.set('view engine', 'mst');
app.set('views', __dirname + '/views');

//exportando a app
module.exports = app;