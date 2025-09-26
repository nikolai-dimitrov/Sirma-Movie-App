const parseCsv = async (filePath, delimiter = ",", singleColumn = false) => {
	const fileData = await fetch(filePath);
	const textFileData = await fileData.text();
	const fileDataArray = textFileData.split("\n");
	const [firstLine, ...restLines] = fileDataArray;

	if (!singleColumn) validateDelimiter(fileDataArray, delimiter);
	// trim because of \r last element
	const headerRow = !singleColumn
		? firstLine.trim().split(delimiter)
		: [firstLine];

	const dataRows = restLines;
	const parsedData = [];

	dataRows.forEach((currentRow, index) => {
		const rowData = {};
		const rowNumber = index + 2;

		if (!singleColumn) {
			// trim because of \r last element
			const currentRowArray = currentRow.trim().split(delimiter);

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
		} else {
			if (currentRow.trim() == "") {
				throw new Error(
					`There is missing column at row: ${rowNumber}. File path: ${filePath}`
				);
			}

			const key = headerRow;
			rowData[key] = currentRow.trim();
		}

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

const validateDelimiter = (csvDataArray, delimiter) => {
	const partialData = csvDataArray.splice(0, 10).map((line) => line.trim()).filter((el => el != ''));
	const hasDelimiter = partialData.every((row) => row.includes(delimiter));

	if (!hasDelimiter) {
		throw new Error(
			`Chosen delimiter - "${delimiter}" does not occur on every row in csv file.`
		);
	}
};

export const csvFileProcessor = {
	getActors: () => parseCsv("/data/actors.csv", ","),
	getMovies: () => parseCsv("/data/movies.csv", ","),
	getRoles: () => parseCsv("/data/roles.csv", ","),
};
