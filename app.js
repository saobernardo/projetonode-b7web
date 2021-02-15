const express = require("express");
const mustache = require('mustache-express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');

const mainRoutes = require("./routes/index");
const helper = require('./helpers');
const errorHandler = require('./handlers/errorHandler');

//Configurações
const app = express();

app.use(express.json()); //transformar os ddos do body em json
app.use(express.urlencoded({extended:true}));//

//Pasta estática, em qualquer lugar do sistema pode ser acessado
app.use(express.static(__dirname+"/public"))

app.use(cookieParser(process.env.SECRET));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

//antes do router, usa-se o helper
app.use((req, res, next)=>{
    //res.locals está criando variáveis globais
    res.locals.h = helper;
    res.locals.flashes = req.flash();
    //a próxima página acessada terá essas informações
    next();
});
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