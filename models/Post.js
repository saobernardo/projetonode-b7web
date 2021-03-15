const mongoose = require('mongoose');
const slug = require('slug');
//Método de prómise é o usado pela forma de comunicação que vamos utilizar, que sempre está atualizado
mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
    photo: String,
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
    tags:[String],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

postSchema.pre('save', async function(next) {
    if(this.isModified('title')){
        this.slug = slug(this.title, {lower: true});
        
        //Regex object
        const slugRegex = new RegExp(`^(${this.slug})((-[0-9]{1,}$)?)$`, 'i');
        //consiguiendo slug de el constructor
        const postWithSlug = await this.constructor.find({slug: slugRegex});

        //Si hay
        if(postWithSlug.length > 0) {
            this.slug = `${this.slug}-${postWithSlug.length+1}`;
        }
    }
    next();
});

postSchema.statics.getTagsList = function() {
    return this.aggregate([
        //Separar todos os dados em relação a suas tags
        {$unwind: '$tags'},
        //agrupar, com os parâmetros: id que a tag representa e a contagem
        {$group: {_id:'$tags', count: {$sum:1}}},
        //ordenar, como o order by
        {$sort:{count: -1}}
    ]);
}

module.exports = mongoose.model('Post', postSchema);