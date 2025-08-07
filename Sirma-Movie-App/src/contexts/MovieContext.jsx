import { useState, useEffect, createContext } from 'react'

import { csvFileProcessor } from '../services/csvFileProcessor'

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [data, setData] = useState({
        movies: [],
        actors: [],
        roles: [],
    })

    const [moviesMappedWithRoles, setMoviesMappedWithRoles] = useState({});

    useEffect(() => {
        const getCsvData = async () => {
            try {
                const [movies, actors, roles] = await Promise.all([
                    csvFileProcessor.getMovies(),
                    csvFileProcessor.getActors(),
                    csvFileProcessor.getRoles(),
                ]);

                const moviesAndRoles = {};

                roles.forEach((currentRole) => {
                    if (!moviesAndRoles[currentRole.MovieID]) {
                        moviesAndRoles[currentRole.MovieID] = [];
                    }

                    moviesAndRoles[currentRole.MovieID].push(currentRole);
                });

                setData({
                    movies,
                    actors,
                    roles
                })

                setMoviesMappedWithRoles(moviesAndRoles);

            } catch (error) {
                console.log(error)
            }
        };
        
        getCsvData();

    }, []);

    const values = {
        data,
        moviesMappedWithRoles,
    }

    return (
        <MovieContext.Provider value={values}>
            {children}
        </MovieContext.Provider>
    )
}