const express = require("express");
const mainRoutes = require("./routes/index");

//Configurações

const app = express();
app.use('/', mainRoutes);
//app.use('/admin', adminRoutes);

app.use(express.json());

//exportando a app
module.exports = app;