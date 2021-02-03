//Importando nossa aplicação no servidor e as variáveis de ambiente
const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config({path:'variables.env'});

//criando conexão de banco
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true});
//Permite ES nas requisições de banco
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
    console.error("Error:" + error.message)
});

//usando váriável de ambiente pra defiir port
app.set('port', process.env.PORT || 7777);

const server = app.listen(app.get('port'), ()=>{
    console.log('Servidor rodando na porta:'+server.address().port);
});