const { Router } = require('express');
const { GetRowsController } = require('../controllers');

const getRowsController = new GetRowsController();

const routes = Router();

routes.get('/rows/:page', getRowsController.handle);

module.exports = routes;
