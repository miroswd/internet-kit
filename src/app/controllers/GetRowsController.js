const { logger, convertToJson } = require('../utils');
const ConnectSheets = require('./GoogleSheetsController');

class GetRowsController {
  /**
   * @typedef Params
   * @property {string} page
   *
   * @param {import('express').Request<Params>} request
   * @param {import('express').Response} response
   * @returns
   */
  async handle(request, response) {
    try {
      const { page } = request.params;

      const rows = await new ConnectSheets().getRows(page);
      const sheetsRowsInJson = convertToJson(rows);

      return response.status(200).json(sheetsRowsInJson);
    } catch (error) {
      logger.error(error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = GetRowsController;
