import { useState } from "react";
export const useForm = (initialFormValues, submitHandler) => {
	const [formValues, setFormValues] = useState(initialFormValues);

	const onChangeHandler = (e) => {
		setFormValues((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmitHandler = (e, id) => {
		e.preventDefault();
		id ? submitHandler(formValues, id) : submitHandler(formValues);
	};

	return { formValues, onChangeHandler, onSubmitHandler };
};
