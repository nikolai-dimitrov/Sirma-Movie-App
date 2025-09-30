export const buildMoviesRelations = (moviesByIds, rolesByIds) => {
	for (const key in rolesByIds) {
		const currentRole = rolesByIds[key];
		if (!moviesByIds[currentRole.MovieID].roles) {
			moviesByIds[currentRole.MovieID].roles = [];
		}

		moviesByIds[currentRole.MovieID].roles.push(currentRole);
	}

	return moviesByIds;
};

export const buildActorsRelations = (actorsByIds, rolesByIds) => {
	for (const key in rolesByIds) {
		const currentRole = rolesByIds[key];
		if (!actorsByIds[currentRole.ActorID].roles) {
			actorsByIds[currentRole.ActorID].roles = [];
		}

		actorsByIds[currentRole.ActorID].roles.push(currentRole);
	}

	return actorsByIds;
};
