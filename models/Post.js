const mongoose = require('mongoose');
const slug = require('slug');
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

postSchema.pre('save', function(next) {
    if(this.isModified('title')){
        this.slug = slug(this.title, {lower: true});
    }
    next();
});

module.exports = mongoose.model('Post', postSchema);