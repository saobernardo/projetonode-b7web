const express = require("express");
const homeController = require("../controllers/homeController");
const routes = express.Router();
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const imageMiddleware = require("../middlewares/imageMiddleware");

/*GET: request.query
POST: request.body
URL PARAMETER: request.params
*/

//rodas são lidas na ordem que foram adicionadas
routes.get('/', homeController.index);
routes.get('/users/login', userController.login);
routes.get('/users/register', userController.register);

routes.get('/post/add', postController.add);
routes.post('/post/add',
    imageMiddleware.upload,
    imageMiddleware.resize,
    postController.addAction
);

routes.get('/post/:slug/edit', postController.edit);
routes.post('/post/:slug/edit', postController.editAction);

routes.get('/post/:slug', postController.view);

module.exports = routes;