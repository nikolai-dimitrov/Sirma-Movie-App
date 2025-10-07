export const buildMoviesRelations = (moviesByIds, rolesByIds) => {
	for (const id in rolesByIds) {
		const currentRole = rolesByIds[id];
		if (!moviesByIds[currentRole.MovieID].roles) {
			moviesByIds[currentRole.MovieID].roles = [];
		}

		moviesByIds[currentRole.MovieID].roles.push(id);
	}

	return moviesByIds;
};

export const buildActorsRelations = (actorsByIds, rolesByIds) => {
	for (const id in rolesByIds) {
		const currentRole = rolesByIds[id];
		if (!actorsByIds[currentRole.ActorID].roles) {
			actorsByIds[currentRole.ActorID].roles = [];
		}

		actorsByIds[currentRole.ActorID].roles.push(id);
	}

	return actorsByIds;
};
