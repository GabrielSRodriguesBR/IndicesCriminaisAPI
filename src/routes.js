const express = require('express');


const IndicesController = require('./Controllers/IndicesController');

const routes = express.Router();
routes.get('/Total', IndicesController.Total);
routes.get('/', IndicesController.get);
routes.get('/:city', IndicesController.get);




module.exports = routes; 