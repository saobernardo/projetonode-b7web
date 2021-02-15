const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.add = (req, res) => {
    res.render('postAdd');
};

exports.addAction = async (req, res) => {
    req.body.tags = req.body.tags.split(',').map(t=>t.trim());
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

exports.editAction = async (req, res) => {
    //alterando o slug caso o título seja alterado
    req.body.slug = require('slug')(req.body.title, {lower: true});
    req.body.tags = req.body.tags.split(',').map(t=>t.trim());

    try{
        const post = await Post.findOneAndUpdate(
            {slug: req.params.slug}, //where
            req.body, //novos dados
            {
                new: true, //retornar novo item atualizado
                runValidators: true
            }
        );
    }
    catch(e){
        req.flash('error', 'Erro' + e.message + 'ocorrido. Tente novamente');
        return res.redirect('/post/'+req.params.slug+'/edit');
    }
    req.flash('success', 'Post atualizado com sucesso');
    res.redirect('/');
};

exports.view = async (req, res) => {
    const post = await Post.findOne({slug: req.params.slug})
    res.render('view', {post});
};