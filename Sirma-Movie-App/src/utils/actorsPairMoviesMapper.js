export const actorsPairMoviesMapper = (moviesAndRoles,moviesById) => {
	// Use mapper instead of counter to avoid later searching for the ids of the movies in which top actor pair played in
	const actorsPairMoviesMapper = {};
	for (const movieId in moviesAndRoles) {
		const roles = moviesAndRoles[movieId];
		// Sort in case of: first movie actors -> [3, 27], second movie actors [27, 3]. To prevent creating new key instead of increment the value existing one
		roles.sort((roleA, roleB) => roleA.ActorID - roleB.ActorID);

		// Iterate the array with role objects for current movie and create all possible combinations of concatenated actor's id pairs
		for (let i = 0; i < roles.length - 1; i++) {
			const currentActorId = roles[i].ActorID;
			for (let j = i + 1; j < roles.length; j++) {
				const nextActorId = roles[j].ActorID;
				const actorsIdPair = `${currentActorId}-${nextActorId}`;

				if (!actorsPairMoviesMapper[actorsIdPair]) {
					actorsPairMoviesMapper[actorsIdPair] = [];
				}

				// Push movie in which they are acted in together on corresponding actors pair id
				actorsPairMoviesMapper[actorsIdPair].push(moviesById[movieId]);
			}
		}
	}

	return actorsPairMoviesMapper;
};

export const getTopActorPair = (moviesAndRoles, moviesById) => {
	const actorsPairWithMovies = actorsPairMoviesMapper(
		moviesAndRoles,
		moviesById
	);
	let lastMaxLength = 0;
	let actorPairId = "";
	let moviesArray = [];

	// Choose this approach because it return topActorPair with one iteration instead of using .map with Math.max and .find
	for (const key in actorsPairWithMovies) {
		const movies = actorsPairWithMovies[key];
		if (movies.length > lastMaxLength) {
			lastMaxLength = movies.length;
			actorPairId = key;
			moviesArray = movies;
		}
	}

	return [actorPairId, moviesArray];
};
