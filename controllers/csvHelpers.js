const fs = require('fs');

const readFile = (file, parser) => {
	try {
		const content = fs.readFileSync(file).toString('utf-8');
		console.log('content', content);
		return parser && typeof parser === 'function' ? parser(content) : content;
	} catch (err) {
		throw err;
	}
};

const csvParser = (csv) => {
	const csvLines = csv.split(/\r\n|\n/);
	const headers = csvLines[0].split(',');
	const lines = [];

	for (let i = 1; i < csvLines.length; i++) {
		const data = csvLines[i].split(',');

		if (data.length == headers.length) {
			const jsonObj = {};

			for (let j = 0; j < headers.length; j++) {
				jsonObj[headers[j]] = data[j];
			}

			lines.push(jsonObj);
		}
	}

	return lines;
};

module.exports = {
	readFile,
	csvParser
};
