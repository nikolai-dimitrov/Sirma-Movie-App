import { useState, useEffect, createContext } from 'react'

import { csvFileProcessor } from '../services/csvFileProcessor'
import { buildDataRelations } from '../utils/buildDataRelations';
import { actorsPairMoviesMapper, getTopActorPair } from '../utils/actorsPairMoviesMapper';
export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [data, setData] = useState({
        movies: [],
        actors: [],
        roles: [],
    })

    const [moviesMappedWithRoles, setMoviesMappedWithRoles] = useState({});
    const [actorsMappedWithRoles, setActorsMappedWithRoles] = useState({});
    const [topActorPair, setTopActorPair] = useState([]);

    useEffect(() => {
        const getCsvData = async () => {
            try {
                const [movies, actors, roles] = await Promise.all([
                    csvFileProcessor.getMovies(),
                    csvFileProcessor.getActors(),
                    csvFileProcessor.getRoles(),
                ]);

                const moviesAndRoles = buildDataRelations(roles, 'MovieID')
                const actorsAndRoles = buildDataRelations(roles, 'ActorID')
                const actorPair = getTopActorPair(moviesAndRoles);

                setData({
                    movies,
                    actors,
                    roles
                });


                setMoviesMappedWithRoles(moviesAndRoles);
                setActorsMappedWithRoles(actorsAndRoles);
                setTopActorPair(actorPair)

            } catch (error) {
                console.log(error)
            }
        };

        getCsvData();

    }, []);


    const values = {
        data,
        moviesMappedWithRoles,
        actorsMappedWithRoles,
        topActorPair,
    }

    console.log(moviesMappedWithRoles)
    console.log(actorsMappedWithRoles)


    return (
        <MovieContext.Provider value={values}>
            {children}
        </MovieContext.Provider>
    )
}