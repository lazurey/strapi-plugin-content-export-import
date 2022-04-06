const VALUE_DELIMITER = ',';
const ROW_DELIMITER = '\n';
const {parse, transforms: {unwind, flatten}} = require('json2csv');

const getRow = (keys, item) => keys.map(k => removeNewLines(item[k])).join(VALUE_DELIMITER);

const removeNewLines = (value) => (typeof value === 'string')
    ? value.replace(/\n/g, ' ')
    : value;

export const convertToCsv = (data) => {
    if (!data || typeof data !== 'object') return '';
    const hasRows = Array.isArray(data);

    if (hasRows) {
        const options = {
            transforms: [
                unwind({paths: ['wishes']}),
                flatten({objects: true, arrays: true, separator: '_'}),
                (item) => {
                    const keys = Object.keys(item);
                    for (let key of keys) {
                        if (key.includes('password') || key.includes('Token')) {
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

export const convertCsvToObject = (data) => {
    if (!data) return '';
    const objectRows = data.split('\r\n')
    const objectKeys = objectRows[0].split(',')
    objectRows.shift()
    const objects = []
    objectRows.map(row => {
        let values = row.split(/,|;/)
        let object = {}
        values.forEach((value, index) => {
            object[objectKeys[index]] = value
        })
        objects.push(object)
    })
    return objects
}
