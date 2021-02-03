const express = require("express");

const routes = express.Router();

/*GET: request.query
POST: request.body
URL PARAMETER: request.params
*/

routes.get('/', (request, response)=>{
    response.json(request.query);
});

routes.get('/posts/:id', (request, response)=>{
    id = request.params.id;
    response.send("ID do post: "+id);
});

routes.get('/sobre', (request, response)=>{
    response.send("Hello World 2");
});

module.exports = routes;