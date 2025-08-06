import { useState, useEffect, createContext } from 'react'

import { csvFileProcessor } from '../services/csvFileProcessor'

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [moviesData, setMoviesData] = useState({
        movies: [],
        actors: [],
        roles: [],
    })

    useEffect(() => {
        const getCsvData = async () => {
            try {
                const [movies, actors, roles] = await Promise.all([
                    csvFileProcessor.getMovies(),
                    csvFileProcessor.getActors(),
                    csvFileProcessor.getRoles(),
                ]);

                setMoviesData({
                    movies,
                    actors,
                    roles
                })

            } catch (error) {
                console.log(error)
            }
        }
        getCsvData();

    }, []);

    console.log(moviesData)

    const values = {
        moviesData
    }

    return (
        <MovieContext.Provider value={values}>
            {children}
        </MovieContext.Provider>
    )
}