export const buildMoviesRelations = (movies, allRoles) => {
	const allMovies = [];

	movies.forEach((currentMovie) => {
		const movieId = currentMovie.ID;
		const filteredRoles = allRoles.filter(
			(currentRole) => currentRole.MovieID == movieId
		);

		allMovies.push({ ...currentMovie, roles: filteredRoles });
	});

	return allMovies;
};

export const buildActorsRelations = (actors, allRoles) => {
	const allActors = [];

	actors.forEach((currentActor) => {
		const actorId = currentActor.ID;
		const filteredRoles = allRoles.filter(
			(currentRole) => currentRole.ActorID == actorId
		);

		allActors.push({ ...currentActor, roles: filteredRoles });
	});

	return allActors;
};

// // Iterate over the roles array and create object, which keys will be the returned value of currentRole[propertyName] and value -> array which contains role objects
// export const buildDataRelations = (roles, propertyName) => {
// 	const dataRelation = {};

// 	roles.forEach((currentRole) => {
// 		const key = currentRole[propertyName];
// 		if (!dataRelation[key]) {
// 			dataRelation[key] = [];
// 		}

// 		dataRelation[key].push(currentRole);
// 	});

// 	return dataRelation;
// };
