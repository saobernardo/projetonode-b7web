const express = require("express");
const homeController = require("../controllers/homeController");
const routes = express.Router();
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");

/*GET: request.query
POST: request.body
URL PARAMETER: request.params
*/

routes.get('/', homeController.index);
routes.get('/users/login', userController.login);
routes.get('/users/register', userController.register);
routes.get('/post/add', postController.add);
router.post('/post/add', postController.addAction);

module.exports = routes;