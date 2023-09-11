const { PAGES } = require('../../constants/pages');
const { redisConnection } = require('../../database/redis');
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
      const { update } = request.query;

      if (!page || (page && !PAGES.includes(page.toUpperCase()))) {
        return response.status(404).json({ error: 'Page is not found' });
      }

      const findPageCache = await redisConnection.get(page);

      if (findPageCache && !update) {
        return response.status(200).json(JSON.parse(findPageCache));
      }

      const rows = await new ConnectSheets().getRows(page);
      const sheetsRowsInJson = convertToJson(rows);

      await redisConnection.set(page, JSON.stringify(sheetsRowsInJson));

      return response.status(200).json(sheetsRowsInJson);
    } catch (error) {
      logger.error(error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = GetRowsController;
