import { useState, useEffect, useContext } from 'react'
import { MovieContext } from '../../contexts/MovieContext';

import { getTopActorPair } from '../../utils/getTopActorPair';

import styles from './home.module.css'
export const Home = () => {
    const { data, moviesMappedWithRoles } = useContext(MovieContext);
    const [topActorPairs, setTopActorPairs] = useState([]);

    useEffect(() => {
        const actorPairs = getTopActorPair(moviesMappedWithRoles);
        setTopActorPairs(actorPairs);
    }, [moviesMappedWithRoles]);

    // TODO: pass actorsById from context to avoid map all entities on every component mount/unmount
    const actorsById = Object.fromEntries(data.actors.map((currentActor) => [currentActor.ID, currentActor]));

    return (
        <section className={styles.home}>
            <h3>Top pairs of actors:</h3>
            {topActorPairs?.map((currentActorPair) => (
                <article key={currentActorPair.actorPairId}>
                    <div className={styles.actorsInformationContainer}>
                        <h4>Actors' names: </h4>
                        <div>
                            <p>{actorsById[currentActorPair.actorPairId.split("-")[0]].FullName}</p>
                            <p>{actorsById[currentActorPair.actorPairId.split("-")[1]].FullName}</p>
                        </div>
                    </div>
                    <h4>Shared Movies List:</h4>
                    <ul className={styles.moviesInformationContainer}>
                        {currentActorPair.movies?.map((currentMovie) => (
                            <li key={currentMovie.ID}>
                                <p>
                                    {currentMovie.Title}
                                </p>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.moviesCountContainer}>
                        <h4>Shared Movies Count: </h4>
                        <p>{currentActorPair.sharedMoviesCount}</p>
                    </div>
                </article>
            ))}
        </section>
    )
}
