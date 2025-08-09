const parseCsv = async (filePath) => {
	const fileData = await fetch(filePath);
	const textFileData = await fileData.text();
	const fileDataArray = textFileData.split("\n");

	const [firstLine, ...restLines] = fileDataArray;

	// trim because of \r last element
	const keysArray = firstLine.trim().split(",");
	const valuesArray = restLines;

	const parsedData = [];

	valuesArray.forEach((currentRow, index) => {
		// trim because of \r last element
		const currentRowArray = currentRow.trim().split(",");
		const rowData = {};

		currentRowArray.forEach((currentRowElement, index) => {
			const key = keysArray[index];
			rowData[key] = currentRowElement;
			if (index == currentRowArray.length - 1) {
				rowData[key] = formatDate(currentRowElement);
			}
		});

		parsedData.push(rowData);
	});

	return parsedData;
};

const formatDate = (dateString) => {
	let date = new Date(dateString);
	if (date == "Invalid Date") {
		return dateString;
	}

	return date.toISOString().split("T")[0];
};

export const csvFileProcessor = {
	getActors: () => parseCsv("/data/actors.csv"),
	getMovies: () => parseCsv("/data/movies.csv"),
	getRoles: () => parseCsv("/data/roles.csv"),
};
