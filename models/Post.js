const mongoose = require('mongoose');
//Método de prómise é o usado pela forma de comunicação que vamos utilizar, que sempre está atualizado
mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:'O post precisa de um título'
    },
    slug:String,
    body:{
        type:String,
        trim:true
    }, 
    tags:[String]
});

module.exports = mongoose.model('Post', postSchema);