const express = require("express");

const routes = express.Router();

/*GET: request.query
POST: request.body
URL PARAMETER: request.params
*/

routes.get('/', (request, response)=>{
    let obj = {
        title: "Título de teste",
        pageTitle: "Título da página"
    };
    response.render('home', obj);
});

module.exports = routes;