import { useState, useEffect } from "react";
export const useDebouncedSearch = (searchParam) => {
	const [debouncedSearchParam, setDebouncedSearchParam] = useState(searchParam);
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedSearchParam(searchParam);
		}, 500);
		return () => clearTimeout(timeoutId);

	}, [searchParam]);

	return debouncedSearchParam
};
