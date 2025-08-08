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

    const [dataById, setDataById] = useState({
        moviesObj: {},
        actorsObj: {},
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

                const actorsObj = Object.fromEntries(actors.map((currentActor) => [currentActor.ID, currentActor]))
                const moviesObj = Object.fromEntries(movies.map((currentMovie) => [currentMovie.ID, currentMovie]))

                const moviesAndRoles = buildDataRelations(roles, 'MovieID')
                const actorsAndRoles = buildDataRelations(roles, 'ActorID')
                const actorPair = getTopActorPair(moviesAndRoles);

                setData({
                    movies,
                    actors,
                    roles
                });

                setDataById({
                    moviesObj,
                    actorsObj,
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
        dataById,
        moviesMappedWithRoles,
        actorsMappedWithRoles,
        topActorPair,
    }

    // console.log(moviesMappedWithRoles)
    // console.log(actorsMappedWithRoles)


    return (
        <MovieContext.Provider value={values}>
            {children}
        </MovieContext.Provider>
    )
}