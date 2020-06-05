export const csvParser = (csv) => {
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
