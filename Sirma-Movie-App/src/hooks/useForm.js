import { useState, useEffect } from "react";
export const useForm = (initialFormValues, submitHandler) => {
	const [formValues, setFormValues] = useState(initialFormValues);
	const [formErrors, setFormErrors] = useState({});

	useEffect(() => {
		setFormValues(initialFormValues);
	}, [initialFormValues]);

	const clearFormValues = () => {
		const formValuesCopy = { ...formValues };
		Object.keys(formValuesCopy).forEach(
			(currentKey) => (formValuesCopy[currentKey] = "")
		);

		setFormValues(formValuesCopy);
	};

	const onChangeHandler = (e) => {
		setFormValues((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmitHandler = (e, id) => {
		e.preventDefault();
		setFormErrors({});

		const formErr = {};
		for (const key in formValues) {
			if (formValues[key].trim().length == 0) {
				formErr[key] = "Field Required!";
			}
		}

		setFormErrors(formErr);

		if (Object.values(formErr).length > 0) return;
		id ? submitHandler(formValues, id) : submitHandler(formValues);
		clearFormValues();
	};

	return { formValues, formErrors, onChangeHandler, onSubmitHandler };
};
