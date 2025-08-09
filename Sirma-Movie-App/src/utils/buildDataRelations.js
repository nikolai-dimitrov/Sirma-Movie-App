// Iterate over the roles array and create object, which keys will be the returned value of currentRole[propertyName] and value -> array which contains role objects
export const buildDataRelations = (roles, propertyName) => {
	const dataRelation = {};

	roles.forEach((currentRole) => {
		const key = currentRole[propertyName];
		if (!dataRelation[key]) {
			dataRelation[key] = [];
		}

		dataRelation[key].push(currentRole);
	});

	return dataRelation;
};
