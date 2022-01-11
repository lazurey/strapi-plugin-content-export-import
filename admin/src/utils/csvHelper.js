const VALUE_DELIMITER = ',';
const ROW_DELIMITER = '\n';

const getRow = (keys, item) => keys.map(k => removeNewLines(item[k])).join(VALUE_DELIMITER);

const removeNewLines = (value) => (typeof value === 'string')
  ? value.replace(/\n/g, ' ')
  : value;

export const convertToCsv = (data) => {
  if (!data || typeof data !== 'object') return '';
  const hasRows = Array.isArray(data);
  const keys = hasRows ? Object.keys(data[0]) : Object.keys(data);
  const rows = hasRows
    ? data.map(item => getRow(keys, item)).join(ROW_DELIMITER)
    : getRow(keys, data);
  return [keys.join(VALUE_DELIMITER), rows].join(ROW_DELIMITER);
}