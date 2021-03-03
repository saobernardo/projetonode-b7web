const User = require('../models/User');

exports.login = (req, res) => {
    res.render('login');
}

exports.loginAction = (req, res) => {
    const auth = User.authenticate();

    //autenticação
    auth(req.body.email, req.body.password, (error, result)=>{
        if(!result){
            req.flash('error', 'Seu email e/ou senha estão incorretos');
            res.redirect('/users/login');
            return;
        }

        req.login(result, () => {}); //Efetuação de login

        req.flash("success", "Logado com sucesso");
        res.redirect('/');
    });
}

exports.register = (req, res) => {
    res.render('register');
}

exports.registerAction = (req, res) => {
    User.register(
        new User(req.body), //Primeiro parâmetro: o corpo do form, na model usuario
        req.body.password,  //Segundo parâmetro: A senha
        (error)=> { //Terceiro parâmetro: O erro, caso ocorra
            if(error){
                req.flash('error', 'Ocorreu um erro. Tente mais tarde');
                res.redirect('/users/register');
                return;
            }

            req.flash("success", 'Registro efetuado com sucesso. Faça o login');
            res.redirect('/users/login');
        }
    );
}

exports.logout = (req, res) => {
    req.logout();
    //res.flash('success', 'Deslogado com sucesso');
    res.redirect('/');
}