export const getTopActorPair = (moviesAndRoles) => {

	// Use mapper instead of counter to avoid later searching for the ids of the movies in which top actor pair played in
	const sharedMovies = {};

	let sharedMoviesCount = 0;
	let topActorPairs = [];

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
						sharedMovies[actorsIdPair].length == sharedMoviesCount
					) {
						topActorPairs.push({
							actorPairId: actorsIdPair,
							movies: sharedMovies[actorsIdPair],
							sharedMoviesCount,
						});
					} else if (
						sharedMovies[actorsIdPair].length > sharedMoviesCount
					) {
						sharedMoviesCount = sharedMovies[actorsIdPair].length;
						topActorPairs = [];
						topActorPairs.push({
							actorPairId: actorsIdPair,
							movies: sharedMovies[actorsIdPair],
							sharedMoviesCount,
						});
					}
				}
			}
		}
	}

	return topActorPairs;
};
