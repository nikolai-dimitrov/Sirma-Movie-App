// Iterate over the roles array and create object, which keys will be the returned value of currentRole[propertyName] and value -> array which contains role objects
export const buildDataRelations = (roles, propertyName, collection) => {
	const dataRelation = {};

	roles.forEach((currentRole) => {
		const key = currentRole[propertyName];
		if (!dataRelation[key]) {
			dataRelation[key] = [];
		}

		// Seed additional data in roles
		if (propertyName == "MovieID") {
			currentRole["MovieName"] = collection[key].Title;
		} else if (propertyName == "ActorID") {
			currentRole["ActorName"] = collection[key].FullName;
		}

		dataRelation[key].push(currentRole);
	});

	return dataRelation;
};
