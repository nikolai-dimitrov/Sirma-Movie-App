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
        }));

    };

    const updateMovieHandler = (newData, movieId) => {
        setData((prevState) => ({
            ...prevState,
            movies: prevState.movies.map((currentMovie) => currentMovie.ID == movieId ? { ...currentMovie, ...newData } : currentMovie)
        }));
    };

    const deleteMovieHandler = (movieId) => {
        setData((prevState) => ({
            ...prevState,
            movies: prevState.movies.filter((currentMovie) => currentMovie.ID != movieId),
            roles: prevState.roles.filter((currentRole) => currentRole.MovieID != movieId),
        }));
    };

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
        }));

    };

    const updateActorHandler = (newData, actorId) => {
        setData((prevState) => ({
            ...prevState,
            actors: prevState.actors.map((currentActor) => currentActor.ID == actorId ? { ...currentActor, ...newData } : currentActor)
        }));
    };

    const deleteActorHandler = (actorId) => {
        setData((prevState) => ({
            ...prevState,
            actors: prevState.actors.filter((currentActor) => currentActor.ID != actorId),
            roles: prevState.roles.filter((currentRole) => currentRole.ActorID != actorId),
        }));
    };

    const addRoleHandler = (formValues) => {
        const highestId = Math.max(...data.roles.map((currentRole) => currentRole.ID))
        console.log('crete')
        const role = {
            'ID': highestId + 1,
            ...formValues,
        }

        setData((prevState) => ({
            ...prevState,
            roles: [...prevState.roles, role]
        }))

    };

    const updateRoleHandler = (newData, roleId) => {
        console.log(newData)
        setData((prevState) => ({
            ...prevState,
            roles: prevState.roles.map((currentRole) => currentRole.ID == roleId ? { ...currentRole, ...newData } : currentRole),
        }));
    };

    const deleteRoleHandler = (roleId) => {
        setData((prevState) => ({
            ...prevState,
            roles: prevState.roles.filter((currentRole) => currentRole.ID != roleId),
        }));
    };


    const values = {
        data,
        moviesMappedWithRoles,
        actorsMappedWithRoles,
        addMovieHandler,
        updateMovieHandler,
        deleteMovieHandler,
        addActorHandler,
        updateActorHandler,
        deleteActorHandler,
        addRoleHandler,
        updateRoleHandler,
        deleteRoleHandler,

    }



    return (
        <MovieContext.Provider value={values}>
            {children}
        </MovieContext.Provider>
    )
}