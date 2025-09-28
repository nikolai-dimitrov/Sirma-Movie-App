export const getTopActorPair = (moviesAndRoles) => {
	// Use mapper instead of counter to avoid later searching for the ids of the movies in which top actor pair played in
	const sharedMovies = {};

	const topActorPair = {
		moviesPlayedCount: 0,
		actorPairId: null,
		movies: [],
	};

	for (const movie of moviesAndRoles) {
		const roles = movie.roles;
		// Sort in case of: first movie actors -> [3, 27], second movie actors [27, 3]. To prevent creating new key instead of increment the value existing one
		if (roles) {
			roles.sort((roleA, roleB) => roleA.ActorID - roleB.ActorID);
			// Iterate the array with role objects for current movie and create all possible combinations of concatenated actor's id pairs
			for (let i = 0; i < roles.length - 1; i++) {
				const currentActorId = roles[i].ActorID;
				for (let j = i + 1; j < roles.length; j++) {
					const nextActorId = roles[j].ActorID;
					const actorsIdPair = `${currentActorId}-${nextActorId}`;

					if (!sharedMovies[actorsIdPair]) {
						sharedMovies[actorsIdPair] = [];
					}

					// Push movie in which they are acted in together with corresponding actors pair id
					sharedMovies[actorsIdPair].push(movie);

					if (
						sharedMovies[actorsIdPair].length >=
						topActorPair.moviesPlayedCount
					) {
						topActorPair.moviesPlayedCount =
							sharedMovies[actorsIdPair].length;
						topActorPair.actorPairId = actorsIdPair;
						topActorPair.movies = sharedMovies[actorsIdPair];
					}
				}
			}
		}
	}

	return topActorPair;
};
