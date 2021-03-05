const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.index = async (req, res)=>{
    let responseJson = {
        pageTitle: 'HOME',
        posts: [],
        tags: [],
        tag: ''
    };

    console.log(req.user);

    responseJson.tag = req.query.t;
    //Filtro de posts para o const posts
    const postFilter = (responseJson.tag) ? {tags: responseJson.tag}: {};
    console.log(postFilter);
    
    const tagsPromise = Post.getTagsList();
    const postsPromise = Post.findPosts(postFilter);

    const [tags, posts] = await Promise.all([tagsPromise, postsPromise]);

    //Adicionando a classe selected do css na tag que estiver selecionada
    for(let i in tags){
        if(tags[i]._id == responseJson.tag){
            tags[i].class = "selected";
        }
    }
    responseJson.tags = tags;
    responseJson.posts = posts;

    res.render('home', responseJson);
};

exports