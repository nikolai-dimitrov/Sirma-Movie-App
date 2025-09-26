export const buildMoviesRelations = (movies, allRoles) => {
	const allMovies = [];
	const rolesByMovieId = {};

	allRoles.forEach((currentRole) => {
		if (!rolesByMovieId[currentRole.MovieID]) {
			rolesByMovieId[currentRole.MovieID] = [];
		}

		rolesByMovieId[currentRole.MovieID].push(currentRole);
	});

	movies.forEach((currentMovie) => {
		const movieId = currentMovie.ID;
		allMovies.push({ ...currentMovie, roles: rolesByMovieId[movieId] });
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
