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
