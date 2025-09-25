const parseCsv = async (filePath, delimiter = ",") => {
	const fileData = await fetch(filePath);
	const textFileData = await fileData.text();
	const fileDataArray = textFileData.split("\n");
	const [firstLine, ...restLines] = fileDataArray;

	// trim because of \r last element
	const headerRow = firstLine.trim().split(delimiter);
	const dataRows = restLines;
	const parsedData = [];

	dataRows.forEach((currentRow, index) => {
		// trim because of \r last element
		const currentRowArray = currentRow.trim().split(delimiter);
		const rowData = {};
		const rowNumber = index + 2;

		if (currentRowArray.length < headerRow.length) {
			throw new Error(
				`There is missing column at row: ${rowNumber}. File path: ${filePath}`
			);
		} else if (currentRowArray.length > headerRow.length) {
			throw new Error(
				`Expected columns: ${headerRow.length}, There are: ${currentRowArray.length} at row: ${rowNumber}. File path: ${filePath}`
			);
		}

		currentRowArray.forEach((currentRowElement, index) => {
			const columNumber = index + 1;
			if (currentRowElement == "") {
				throw new Error(
					`At row number: ${rowNumber}, column number: ${columNumber} is empty. File path: ${filePath}`
				);
			}

			const key = headerRow[index];
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
	getActors: () => parseCsv("/data/actors.csv", ","),
	getMovies: () => parseCsv("/data/movies.csv", ","),
	getRoles: () => parseCsv("/data/roles.csv", ","),
};
