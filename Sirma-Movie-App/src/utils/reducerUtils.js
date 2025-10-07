export const deleteMovieRoles = (state, movie) => {
	const roleIds = movie?.roles || [];
	const actorIds = [];
	const updatedActors = {};
	const rolesCopy = { ...state.rolesByIds };

	if (roleIds.length > 0) {
		roleIds.forEach((roleId) => {
			const actorId = rolesCopy[roleId].ActorID;
			actorIds.push(actorId);

			delete rolesCopy[roleId];
		});

		actorIds.forEach((actorId) => {
			const actor = state.actorsByIds[actorId];
			const existingRoles = actor.roles.filter((roleId) => {
				if (!roleIds.includes(roleId)) {
					return roleId;
				}
			});

			const updatedActor = {
				...actor,
				roles: existingRoles,
			};

			updatedActors[actorId] = updatedActor;
		});
	}

	return [updatedActors, rolesCopy, roleIds];
};

export const deleteActorRoles = (state, actor) => {
	const roleIds = actor?.roles || [];
	const movieIds = [];
	const updatedMovies = {};
	const rolesCopy = { ...state.rolesByIds };

	if (roleIds.length > 0) {
		roleIds.forEach((roleId) => {
			const movieId = rolesCopy[roleId].MovieID;
			movieIds.push(movieId);

			delete rolesCopy[roleId];
		});

		movieIds.forEach((movieId) => {
			const movie = state.moviesByIds[movieId];
			const existingRoles = movie.roles.filter((roleId) => {
				if (!roleIds.includes(roleId)) {
					return roleId;
				}
			});

			const updatedMovie = {
				...movie,
				roles: existingRoles,
			};

			updatedMovies[movieId] = updatedMovie;
		});
	}

	return [updatedMovies, rolesCopy, roleIds];
};
