import { useState, useEffect, createContext, useReducer } from 'react'
import { csvFileProcessor } from '../services/csvFileProcessor'
import { buildActorsRelations, buildMoviesRelations } from '../utils/buildDataRelations';
import { dataReducer } from '../reducers/dataReducer';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [data, dispatch] = useReducer(dataReducer, {
        moviesByIds: {},
        allMoviesIds: [],
        actorsByIds: {},
        allActorsIds: [],
        rolesByIds: {},
        allRolesIds: [],
    })

    const [serverError, setServerError] = useState(null);

    useEffect(() => {
        const getCsvData = async () => {
            try {
                const [[moviesByIds, allMoviesIds], [actorsByIds, allActorsIds], [rolesByIds, allRolesIds]] = await Promise.all([
                    csvFileProcessor.getMovies(),
                    csvFileProcessor.getActors(),
                    csvFileProcessor.getRoles(),
                ]);

                const moviesWithRoles = buildMoviesRelations(moviesByIds, rolesByIds);
                const actorsWithRoles = buildActorsRelations(actorsByIds, rolesByIds)

                dispatch({
                    type: 'set_initial_data',
                    payload: {
                        moviesByIds: moviesWithRoles,
                        allMoviesIds,
                        actorsByIds: actorsWithRoles,
                        allActorsIds,
                        rolesByIds,
                        allRolesIds,
                    }
                })

            } catch (error) {
                console.log(error)
            }
        };
        getCsvData();

    }, []);

    const clearServerErrors = () => {
        setServerError(null);
    }

    const addMovieHandler = (formValues) => {
        const highestId = Math.max(...data.allMoviesIds)

        const movie = {
            'ID': highestId + 1,
            ...formValues,
            roles: [],
        };

        let isMovieExists = data.allMoviesIds.find((currentMovieId) => data.moviesByIds[currentMovieId].Title == formValues.Title);
        if (isMovieExists) {
            setServerError('This movie title already exists!');
            return
        }

        dispatch({ type: 'create_movie', payload: movie })
        clearServerErrors();

    };

    const updateMovieHandler = (newData, movieId) => {
        // TODO: prevent updating movie title with existing title.
        // let isMovieExists = data.allMoviesIds.find((currentMovieId) => data.moviesByIds[currentMovieId].Title == newData?.Title);
        // if (isMovieExists) {
        //     setServerError('This movie title already exists!');
        //     return
        // }

        dispatch({ type: 'update_movie', payload: { id: movieId, newData } });

    }

    const deleteMovieHandler = (movieId) => {
        dispatch({ type: 'delete_movie', payload: { id: movieId } })
    }

    const addActorHandler = (formValues) => {
        const highestId = Math.max(...data.actors.map((currentActor) => currentActor.ID))

        const actor = {
            'ID': highestId + 1,
            ...formValues,
            roles: [],
        };

        let isActorExists = data.actors.find((currentActor) => currentActor.FullName == formValues.FullName)

        if (isActorExists) {
            setServerError('This actor already exists!');
            return;
        }

        setData((prevState) => ({
            ...prevState,
            actors: [...prevState.actors, actor]
        }))

        clearServerErrors();

    };

    const updateActorHandler = (updatedActor, actorId) => {
        setData((prevState) => ({
            ...prevState,
            actors: prevState.actors.map((currentActor) => currentActor.ID == actorId ? { ...currentActor, ...updatedActor } : currentActor)
        }))
    }

    const deleteActorHandler = (actorId) => {
        setData((prevState) => ({
            ...prevState,
            actors: prevState.actors.filter((currentActor) => currentActor.ID != actorId),
            roles: prevState.roles.filter((currentRole) => currentRole.ActorID != actorId),
        }))
    }

    const values = {
        data,
        serverError,
        clearServerErrors,
        addMovieHandler,
        updateMovieHandler,
        deleteMovieHandler,
        addActorHandler,
        updateActorHandler,
        deleteActorHandler,

    }



    return (
        <MovieContext.Provider value={values}>
            {children}
        </MovieContext.Provider>
    )
}