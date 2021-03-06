const crypto = require('crypto');

const User = require('../models/User');
const mailHandler = require('../handlers/mailHandler');

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
    req.logout(); //método de logout do passport
    res.redirect('/');
}

exports.profile = (req, res) => {
    res.render('profile');
}

exports.profileAction = async (req, res) => {
    try{
        const user = await User.findOneAndUpdate(
            {_id: req.user._id}, //qual
            {name: req.body.name, email:req.body.email}, //Quais informações irei alterar
            {new: true, runValidators: true}
        );
    }
    catch(e){
        req.flash('error', 'Ocorreu o erro:'+ e.message);
        res.redirect('/profile');
        return;
    }

    req.flash('success', 'Dados atualizados com sucesso!');
    res.redirect('/profile');
}

exports.forget = (req, res) => {
    res.render('forget');
}

exports.forgetAction = async (req, res) => {
    const user = await User.findOne({email:req.body.email}).exec();
    if(!user){
        req.flash('error', 'Um e-mail foi enviado para você, caso esteja cadastrado');
        res.redirect('/users/forget');
        return;
    }

    user.resetPasswordToken = crypto.randomBytes(20).toString('hex'); //Gerando Token usando biblioteca interna node
    user.resetPasswordExpire = Date.now() + 3600000; //1 hora
    await user.save();

    const resetLink = `http://${req.headers.host}/users/reset/${user.resetPasswordToken}`; //link para resetar email
    const html = `Testando email com Link:<br /> <a href="${resetLink}">Resetar sua senha</a>`;
    const text = `Testando email com Link: ${resetLink} `;
    
    mailHandler.send({
        to: user.email,
        subject: 'Resetar sua senha',
        html,
        text
    });

    req.flash('success', 'Te enviamos um email com instruções.');
    res.redirect('/users/login');
}

exports.forgetToken = async (req, res) => {
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpire: {$gt: Date.now()} //gt = greater than
    }).exec();

    if(!user){
        req.flash('error', 'Token Expirado');
        res.redirect('/users/forget');
        return;
    }

    res.render('forgetPassword');
}

exports.forgetTokenAction = async (req, res) => {
    //Verifica Token
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpire: {$gt: Date.now()} //gt = greater than
    }).exec();

    if(!user){
        req.flash('error', 'Token Expirado um não encontrado');
        res.redirect('/users/forget');
        return;
    }

    //Muda a senha
    if(req.body.password != req.body['password-confirm']){
        req.flash('error', 'Senhas não batem');
        res.redirect('back');
        return;
    }

    user.setPassword(
        req.body.password, //nova senha
        async () => {
            await user.save() //salvar no banco
            req.flash('success', 'Senha alterada com sucesso');
            res.redirect('/')
        }
    );
}