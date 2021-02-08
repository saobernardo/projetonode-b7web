const express = require("express");
const homeController = require("../controllers/homeController");
const routes = express.Router();
const userController = require("../controllers/userController");

/*GET: request.query
POST: request.body
URL PARAMETER: request.params
*/

routes.get('/', homeController.userMiddleware, homeController.index);
routes.get('/users/login', userController.login);
routes.get('/users/register', userController.register);

module.exports = routes;