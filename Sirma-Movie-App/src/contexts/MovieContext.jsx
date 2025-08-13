import { useState, useEffect, createContext } from 'react'

import { csvFileProcessor } from '../services/csvFileProcessor'
import { buildActorsRelations, buildMoviesRelations } from '../utils/buildDataRelations';
import { seedRoleDetails } from '../utils/seedRoleDetails';
import { getTopActorPair } from '../utils/actorsPairMoviesMapper';
export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [data, setData] = useState({
        movies: [],
        actors: [],
        roles: [],
    })

    const [moviesMappedWithRoles, setMoviesMappedWithRoles] = useState([]);
    const [actorsMappedWithRoles, setActorsMappedWithRoles] = useState([]);

    const [serverError, setServerError] = useState(null);

    useEffect(() => {
        const getCsvData = async () => {
            try {
                const [movies, actors, roles] = await Promise.all([
                    csvFileProcessor.getMovies(),
                    csvFileProcessor.getActors(),
                    csvFileProcessor.getRoles(),
                ]);


                setData({
                    movies,
                    actors,
                    roles
                });


            } catch (error) {
                console.log(error)
            }
        };
        getCsvData();

    }, []);

    useEffect(() => {
        const seededRoles = seedRoleDetails(data)

        const moviesAndRoles = buildMoviesRelations(data.movies, seededRoles);
        const actorsAndRoles = buildActorsRelations(data.actors, seededRoles)


        setMoviesMappedWithRoles(moviesAndRoles);
        setActorsMappedWithRoles(actorsAndRoles);

    }, [data])

    const clearServerErrors = () => {
        setServerError(null);
    }

    const addMovieHandler = (formValues) => {
        const highestId = Math.max(...data.movies.map((currentMovie) => currentMovie.ID))
        const movie = {
            'ID': highestId + 1,
            ...formValues,
            roles: [],
        };

        let isMovieExists = data.movies.find((currentMovie) => currentMovie.Title == formValues.Title);
        if (isMovieExists) {
            setServerError('This movie title already exists!');
            return
        }

        setData((prevState) => ({
            ...prevState,
            movies: [...prevState.movies, movie]
        }))

        clearServerErrors();

    };

    const updateMovieHandler = (updatedMovie, movieId) => {
        setData((prevState) => ({
            ...prevState,
            movies: prevState.movies.map((currentMovie) => currentMovie.ID == movieId ? { ...currentMovie, ...updatedMovie } : currentMovie)
        }))
    }

    const deleteMovieHandler = (movieId) => {
        setData((prevState) => ({
            ...prevState,
            movies: prevState.movies.filter((currentMovie) => currentMovie.ID != movieId),
            roles: prevState.roles.filter((currentRole) => currentRole.MovieID != movieId),
        }))
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
        moviesMappedWithRoles,
        actorsMappedWithRoles,
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