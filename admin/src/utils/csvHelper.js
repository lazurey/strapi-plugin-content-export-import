const VALUE_DELIMITER = ',';
const ROW_DELIMITER = '\n';
const { parse, transforms: { flatten } } = require('json2csv');

const getRow = (keys, item) => keys.map(k => removeNewLines(item[k])).join(VALUE_DELIMITER);

const removeNewLines = (value) => (typeof value === 'string')
  ? value.replace(/\n/g, ' ')
  : value;

export const convertToCsv = (data) => {
  if (!data || typeof data !== 'object') return '';
  const hasRows = Array.isArray(data);

  if (hasRows) {
    const options =  {
      transforms: [flatten({objects: true, arrays: true, separator: '_' }),
        (item) => {
        const keys = Object.keys(item);
        for (let key of keys) {
          if (key.includes('_id') || key.includes('password') || key.includes('Token')) {
            delete item[key]
          }
        }
        return item
      }]
    }
    let csv = parse(data, options)
    return csv
  }
  const keys = hasRows ? Object.keys(data[0]) : Object.keys(data);
  const rows = hasRows
    ? data.map(item => getRow(keys, item)).join(ROW_DELIMITER)
    : getRow(keys, data);
  return [keys.join(VALUE_DELIMITER), rows].join(ROW_DELIMITER);
}
