const { Router } = require('express');
const { GetRowsController, HealthController } = require('../controllers');

const getRowsController = new GetRowsController();
const healthController = new HealthController();
const routes = Router();

routes.get('/rows/:page', getRowsController.handle);
routes.get('/health', healthController.handle);

module.exports = routes;
