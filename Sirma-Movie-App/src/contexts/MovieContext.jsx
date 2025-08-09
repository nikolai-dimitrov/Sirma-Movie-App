import { useState, useEffect, createContext } from 'react'

import { csvFileProcessor } from '../services/csvFileProcessor'
import { buildActorsRelations, buildMoviesRelations } from '../utils/buildDataRelations';
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
    const [detailedRoles, setDetailedRoles] = useState([]);
    const [topActorPair, setTopActorPair] = useState([]);

    useEffect(() => {
        const getCsvData = async () => {
            try {
                const [movies, actors, roles] = await Promise.all([
                    csvFileProcessor.getMovies(),
                    csvFileProcessor.getActors(),
                    csvFileProcessor.getRoles(),
                ]);

                // Used for easier data seeding
                const actorsById = Object.fromEntries(actors.map((currentActor) => [currentActor.ID, currentActor]));
                const moviesById = Object.fromEntries(movies.map((currentMovie) => [currentMovie.ID, currentMovie]));

                const seededRoles = roles.map((currentRole) => {
                    const movieId = currentRole.MovieID;
                    const actorId = currentRole.ActorID;

                    currentRole["MovieDetails"] = moviesById[movieId];
                    currentRole["ActorDetails"] = actorsById[actorId];

                    return currentRole
                });

                const moviesAndRoles = buildMoviesRelations(movies, seededRoles);
                const actorsAndRoles = buildActorsRelations(actors, seededRoles)

                const actorPair = getTopActorPair(moviesAndRoles);

                setData({
                    movies,
                    actors,
                    roles
                });

                setMoviesMappedWithRoles(moviesAndRoles);
                setActorsMappedWithRoles(actorsAndRoles);
                setDetailedRoles(seededRoles);
                setTopActorPair(actorPair);

            } catch (error) {
                console.log(error)
            }
        };
        getCsvData();

    }, []);

    const addRole = () => {
        const role = {
            'ID': 52,
            'ActorID': 51,
            'MovieID': 51,
            'RoleName': 'NewRole',
        }

        setData((prevState) => ({
            ...prevState,
            roles: [...prevState.roles, role]
        }))
    }

    const addActor = () => {
        const actor = {
            'ID': data.actors.length + 1,
            'FullName': `Actor ${data.movies.length + 1} Last Name`,
            'BirthDate': '1910-06-01',
            roles: [],
        };

        setActorsMappedWithRoles((prevState) => (
            [...prevState, actor]
        ))

        console.log(actor)
    }

    const addMovieHandler = (formValues) => {
        const movie = {
            'ID': moviesMappedWithRoles.length + 1,
            ...formValues,
            roles: [],
        };

        setMoviesMappedWithRoles((prevState) => (
            [...prevState, movie]
        ))

    };

    const updateMovieHandler = (updatedMovie, movieId) => {
        setMoviesMappedWithRoles((prevState) => (
            prevState.map((currentMovie) => currentMovie.ID == movieId ? { ...currentMovie, ...updatedMovie } : currentMovie))
        )
    }

    const deleteMovieHandler = (movieId) => {
        setMoviesMappedWithRoles((prevState) => (
            prevState.filter((currentMovie) => currentMovie.ID != movieId)
        ))
    }

    const values = {
        data,
        moviesMappedWithRoles,
        actorsMappedWithRoles,
        topActorPair,
        addRole,
        addActor,
        addMovieHandler,
        updateMovieHandler,
        deleteMovieHandler,
    }



    return (
        <MovieContext.Provider value={values}>
            {children}
        </MovieContext.Provider>
    )
}