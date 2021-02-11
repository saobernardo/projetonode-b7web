//Importando nossa aplicação no servidor e as variáveis de ambiente
const mongoose = require('mongoose');
require('dotenv').config({path:'variables.env'});

//criando conexão de banco
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true});
//Permite ES nas requisições de banco
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
    console.error("Error:" + error.message)
});

//Carregando os models antes da aplicação
require('./models/Post');

const app = require('./app');
//usando váriável de ambiente pra definir port
app.set('port', process.env.PORT || 7777);

const server = app.listen(app.get('port'), ()=>{
    console.log('Servidor rodando na porta:'+server.address().port);
});