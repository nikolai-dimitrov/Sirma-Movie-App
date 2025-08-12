export const fieldRequired = (value) => {
	if (value == "") {
		return "This field is required";
	}
};

export const fieldContainOnlyLetters = (value) => {
	const regex = /^([a-zA-Z ]){2,30}/;
	const isMatch = value.match(regex);

	if (!isMatch) {
		return "Only letters allowed";
	}
};
