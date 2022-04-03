require('dotenv').config();
const { google } = require('googleapis');
const { logger, convertToSheetsFormat } = require('../utils');

const { CREDENTIALS } = process.env;

class ConnectSheets {
  async config() {
    this.auth = new google.auth.GoogleAuth({
      // keyFile: 'credentials.json',
      credentials: JSON.parse(CREDENTIALS),
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    this.client = await this.auth.getClient();

    this.googleSheets = google.sheets({ version: 'v4', auth: this.client });

    this.spreadsheetId = process.env.SHEETS_ID;

    this.metaData = await this.googleSheets.spreadsheets.get({
      auth: this.auth,
      spreadsheetId: this.spreadsheetId,
    });
  }

  /**
   * @typedef {Object} rows
   * @property {String} rows.range
   * @property {String} rows.majorDimension
   * @property {String[]} rows.values
   *
   * @param {String} page Name of sheets page
   */
  async getRows(page) {
    await this.config().catch((err) => {
      logger.error(err.message);
    });

    logger.info('Configured, waiting rows. Setting Redis to agility');
    const rows = await this.googleSheets.spreadsheets.values
      .get({
        auth: this.auth,
        spreadsheetId: this.spreadsheetId,
        // range: "page_log!A:A",
        // range: `${page}!A2:C`,
        range: page,
      })
      .then((res) => res.data)
      .catch((error) => logger.error(error));
    logger.info(rows);
    return rows.values;
  }

  /**
   * @async writeRows
   * @param {Object} data
   * @param {String} data.page Name of sheets page
   * @param {Array[]} data.payload Data to save on sheets
   * @example {page: "TESTE", payload: [["name", "age"], ["john", "30"]]}
   */
  async writeRows({ page, payload }) {
    this.googleSheets.spreadsheets.values
      .append({
        auth: this.auth,
        spreadsheetId: this.spreadsheetId,
        range: page,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: payload,
        },
      })
      .then((res) => logger.info('Save on sheets'));
  }

  /**
   * @param {Object} data
   * @param {Object} data.payload
   * @param {String} data.page
   */
  async execute({ payload, page }) {
    const rows = await this.getRows({ page });

    const formattedSheets = convertToSheetsFormat(payload);

    if (rows.values && rows.values.length) {
      formattedSheets.shift();
    }

    await this.writeRows({
      page,
      payload: formattedSheets,
    });
  }
}

/*
const main = async () => {
  const connectSheets = new ConnectSheets();
  await connectSheets.execute({
    page: 'MEMES',
    payload: { vaca: 'amarela' },
  });

  const results = await connectSheets.getRows({
    page: 'MEMES',
  });

  logger.info(results);
};
main();
*/

module.exports = ConnectSheets;
