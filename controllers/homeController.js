exports.userMiddleware = (req, res, next) => {
    let info = {name: 'Lucas', id: 123};
    req.userInfo = info;
    next();
};

exports.index = (req, res)=>{
    let obj = {
        userName: req.userInfo.name,
        userInfo: req.userInfo
    };
    res.render('home', obj);
};