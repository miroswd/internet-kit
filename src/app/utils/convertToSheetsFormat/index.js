const logger = require('../logger');

/**
 * @description transforma object to array of arrays [[keys], [values]]
 * @function convertToSheetsFormat
 * @param {Object} payload
 * @returns {Array[]}
 */
const convertToSheetsFormat = (payload) => {
  try {
    if (!payload) return;

    const objectKeys = [];
    const objectValues = [];

    const stringifyValues = (value) => {
      if (typeof value === 'object') {
        return JSON.stringify(value);
      }
      return value;
    };

    if (Array.isArray(payload)) {
      payload.forEach((e) => {
        objectKeys.push(Object.keys(e));
        const values = Object.values(e);

        const formattedValues = [];
        values.forEach((value) => {
          formattedValues.push(stringifyValues(value));
        });

        objectValues.push(formattedValues);
      });
    } else {
      objectKeys.push(Object.keys(payload));

      const values = Object.values(payload);
      values.forEach((value) => {
        const valueFormatted = stringifyValues(value);
        objectValues.push([valueFormatted]);
      });
    }

    const sheetsFormat = [[...new Set(...objectKeys)], ...objectValues];
    return sheetsFormat;
  } catch (error) {
    logger.error(error);
  }
};

module.exports = convertToSheetsFormat;
