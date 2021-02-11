const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.add = (req, res) => {
    res.render('postAdd');
};

exports.addAction = async (req, res) => {
    const post = new Post(req.body); //Pega os dados e coloca no objeto da model
    try{
        await post.save(); //salva no banco
        req.flash('success', 'Post salvo com sucesso');
        res.redirect('/'); //Redirecionamento
    }
    catch(e){
        req.flash('error', 'Erro' + e.message + 'ocorrido. Tente novamente');
        return res.redirect('/post/add');
    }
}

exports.edit = async (req, res) => {
    const post = await Post.findOne({slug:req.params.slug});
    console.log(JSON.stringify(post));
    res.render('postEdit', {post});
};