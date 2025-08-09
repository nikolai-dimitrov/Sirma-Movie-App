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
                const actorsById = Object.fromEntries(actors.map((currentActor) => [currentActor.ID, currentActor]))
                const moviesById = Object.fromEntries(movies.map((currentMovie) => [currentMovie.ID, currentMovie]))

                const seededRoles = roles.map((currentRole) => {
                    const movieId = currentRole.MovieID
                    const actorId = currentRole.ActorID

                    currentRole["MovieDetails"] = moviesById[movieId];
                    currentRole["ActorDetails"] = actorsById[actorId];

                    return currentRole
                })

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
                setTopActorPair(actorPair)

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
            // 'ActorName':'New Actor',
            // 'MovieName':'New Movie'
        }

        setData((prevState) => ({
            ...prevState,
            roles: [...prevState.roles, role]
        }))

        // console.log(moviesMappedWithRoles,'movies mapped with roles')
        // setMoviesMappedWithRoles((prevState) => ({
        //     ...prevState,
        //     [role.MovieID]: [...prevState[role.MovieID], role]
        // }))

        // setActorsMappedWithRoles((prevState) => ({
        //     ...prevState,
        //     [role.ActorID]: [...prevState[role.ActorID], role]
        // }))
        // console.log(role)
    }

    const addActor = () => {
        const actor = {
            'ID': data.actors.length + 1,
            'FullName': `Actor ${data.movies.length + 1} Last Name`,
            'BirthDate': '1910-06-01',
        };

        setData((prevState) => ({
            ...prevState,
            actors: [...prevState.actors, actor]
        }))

        console.log(actor)
    }

    const addMovie = () => {
        const movie = {
            'ID': data.movies.length + 1,
            'Title': `Movie Title ${data.movies.length + 1}`,
            'ReleaseDate': '01/06/1920',
        };

        setData((prevState) => ({
            ...prevState,
            movies: [...prevState.movies, movie]
        }))

        console.log(movie)

    }

    const values = {
        data,
        moviesMappedWithRoles,
        actorsMappedWithRoles,
        topActorPair,
        addRole,
        addActor,
        addMovie,
    }

    // console.log(moviesMappedWithRoles)
    // console.log(actorsMappedWithRoles)


    return (
        <MovieContext.Provider value={values}>
            {children}
        </MovieContext.Provider>
    )
}