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
    const [topActorPair, setTopActorPair] = useState([]);

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

        const actorPair = getTopActorPair(moviesAndRoles);

        setMoviesMappedWithRoles(moviesAndRoles);
        setActorsMappedWithRoles(actorsAndRoles);
        setTopActorPair(actorPair);

    }, [data])

    const addRole = () => {
        const role = {
            'ID': 52,
            'ActorID': 50,
            'MovieID': 50,
            'RoleName': 'NewRole SEEDED',
        }

        setData((prevState) => ({
            ...prevState,
            roles: [...prevState.roles, role]
        }))
    }

    const addMovieHandler = (formValues) => {
        const highestId = Math.max(...data.movies.map((currentMovie) => currentMovie.ID))
        const movie = {
            'ID': highestId + 1,
            ...formValues,
            roles: [],
        };

        setData((prevState) => ({
            ...prevState,
            movies: [...prevState.movies, movie]
        }))

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

        setData((prevState) => ({
            ...prevState,
            actors: [...prevState.actors, actor]
        }))

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
        moviesMappedWithRoles,
        actorsMappedWithRoles,
        topActorPair,
        addRole,
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