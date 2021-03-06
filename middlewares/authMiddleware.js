//Faz a verificação para ver se o usuário está logado, com um método próprio do passport
exports.isLogged = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.flash('error','Por favor, faça o login para acessar essa página');
        res.redirect('/users/login');
        return;
    }
    next();
};

exports.changePassword = (req, res) => {
    if(req.body.password != req.body['password-confirm']){
        req.flash('error', 'Senhas não batem');
        res.redirect('/profile');
        return;
    }

    req.user.setPassword(
        req.body.password, //nova senha
        async () => {
            await req.user.save() //salvar no banco
            req.flash('success', 'Senha alterada com sucesso');
            res.redirect('/')
        }  
    );
}