const express = require("express");
const homeController = require("../controllers/homeController");
const routes = express.Router();
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const imageMiddleware = require("../middlewares/imageMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

/*GET: request.query
POST: request.body
URL PARAMETER: request.params
*/

//rodas são lidas na ordem que foram adicionadas
routes.get('/', homeController.index);
routes.get('/users/login', userController.login);
routes.post('/users/login', userController.loginAction);
routes.get('/users/logout', userController.logout);

routes.get('/users/forget', userController.forget);
routes.post('/users/forget', userController.forgetAction);

routes.get('/users/reset/:token', userController.forgetToken);
routes.post('/users/reset/:token', userController.forgetTokenAction);

routes.get('/users/register', userController.register);
routes.post('/users/register', userController.registerAction);

routes.get('/profile', authMiddleware.isLogged, userController.profile);
routes.post('/profile', authMiddleware.isLogged, userController.profileAction);

routes.post('/profile/password', authMiddleware.isLogged, authMiddleware.changePassword);

routes.get('/post/add', authMiddleware.isLogged, postController.add);
routes.post('/post/add',
    authMiddleware.isLogged,
    imageMiddleware.upload,
    imageMiddleware.resize,
    postController.addAction
);

routes.get('/post/:slug/edit', authMiddleware.isLogged, postController.edit);
routes.post('/post/:slug/edit', 
    authMiddleware.isLogged,
    imageMiddleware.upload,
    imageMiddleware.resize,
    postController.editAction
);

routes.get('/post/:slug', postController.view);

module.exports = routes;