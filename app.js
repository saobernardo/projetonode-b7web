const express = require("express");
const mustache = require('mustache-express');
const mainRoutes = require("./routes/index");
const helper = require('./helpers');

//Configurações
const app = express();
//antes do router, usa-se o helper
app.use((req, res, next)=>{
    res.locals.h = helper;
    res.locals.teste='123';
    next();
});
app.use('/', mainRoutes);
app.use(express.json());

//configurando Template Engine
app.engine('mst', mustache(__dirname+'/views/partials', '.mst'));
app.set('view engine', 'mst');
app.set('views', __dirname + '/views');

//exportando a app
module.exports = app;