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

    }

    const addMovieHandler = (formValues) => {
        const movie = {
            'ID': moviesMappedWithRoles.length + 1,
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
            roles:prevState.roles.filter((currentRole) => currentRole.MovieID != movieId),
        }))
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