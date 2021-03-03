//Faz a verificação para ver se o usuário está logado, com um método próprio do passport
module.exports.isLogged = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.flash('error','Por favor, faça o login para acessar essa página');
        res.redirect('/users/login');
        return;
    }
    next();
};