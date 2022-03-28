/**
 * @description convert array to json
 * @param {Array} sheetsArray
 * @returns {Object[]}
 */
const convertToJson = (sheetsArray) => {
  const [keys, ...values] = sheetsArray;
  const shuffledValues = values.sort((a, b) => 0.5 - Math.random());
  const items = [];
  for (let j = 0; j < values.length; j++) {
    const payload = {};
    for (let i = 0; i < keys.length; i++) {
      Object.assign(payload, { [keys[i]]: shuffledValues[j][i] || null });
    }
    items.push(payload);
  }

  return items;
};

module.exports = convertToJson;
