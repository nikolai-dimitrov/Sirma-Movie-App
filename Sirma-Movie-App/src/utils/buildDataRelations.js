// Iterate over the roles array and create object with keys -> passed keyString and value -> array which contains role objects
export const buildDataRelations = (roles, keyString) => {
	const dataRelation = {};

	roles.forEach((currentRole) => {
        const key = currentRole[keyString]
		if (!dataRelation[key]) {
			dataRelation[key] = [];
		}

		dataRelation[key].push(currentRole);
	});

	return dataRelation;
};
