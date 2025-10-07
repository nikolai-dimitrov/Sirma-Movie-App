import { deleteMovieRoles } from "../utils/reducerUtils";
export const dataReducer = (state, action) => {
	switch (action.type) {
		case "set_initial_data": {
			return { ...state, ...action.payload };
		}

		case "create_movie": {
			return {
				...state,
				allMoviesIds: [...state.allMoviesIds, action.payload.ID],
				moviesByIds: {
					...state.moviesByIds,
					[action.payload.ID]: action.payload,
				},
			};
		}

		case "update_movie": {
			return {
				...state,
				moviesByIds: {
					...state.moviesByIds,
					[action.payload.id]: {
						...state.moviesByIds[action.payload.id],
						...action.payload.newData,
					},
				},
			};
		}

		case "delete_movie": {
			const movie = state.moviesByIds[action.payload.id];

			const [updatedActors, updatedRoles, roleIds] = deleteMovieRoles(
				state,
				movie
			);
			delete state.moviesByIds[action.payload.id];

			return {
				...state,

				allMoviesIds: state.allMoviesIds.filter(
					(movieId) => movieId != action.payload.id
				),

				allRolesIds: state.allRolesIds.filter((roleId) => {
					if (!roleIds.includes(roleId)) {
						return roleId;
					}
				}),

				actorsByIds: { ...state.actorsByIds, ...updatedActors },
				rolesByIds: { ...state.roleIds, ...updatedRoles },
			};
		}

		case "create_actor": {
			return {
				...state,
				allActorsIds: [...state.allActorsIds, action.payload.ID],
				actorsByIds: {
					...state.actorsByIds,
					[action.payload.ID]: action.payload,
				},
			};
		}

		case "update_actor": {
			return {
				...state,
				actorsByIds: {
					...state.actorsByIds,
					[action.payload.id]: {
						...state.actorsByIds[action.payload.id],
						...action.payload.newData,
					},
				},
			};
		}
		case "delete_actor": {
		}
		default:
			return state;
	}
};
