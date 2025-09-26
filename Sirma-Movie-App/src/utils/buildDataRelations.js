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
	const rolesByActorId = {};

	allRoles.forEach((currentRole) => {
		if (!rolesByActorId[currentRole.ActorID]) {
			rolesByActorId[currentRole.ActorID] = [];
		}

		rolesByActorId[currentRole.ActorID].push(currentRole);
	});

	actors.forEach((currentActor) => {
		const actorId = currentActor.ID;

		allActors.push({ ...currentActor, roles: rolesByActorId[actorId] });
	});

	return allActors;
};
