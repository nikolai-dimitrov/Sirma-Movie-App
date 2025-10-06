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
			delete state.moviesByIds[action.payload.id]
			return {
				...state,
				allMoviesIds: state.allMoviesIds.filter(
					(movieId) => movieId != action.payload.id
				),
			};
		}

		case "create_actor": {
		}
		case "update_actor": {
		}
		case "delete_actor": {
		}
		default:
			return state;
	}
};
