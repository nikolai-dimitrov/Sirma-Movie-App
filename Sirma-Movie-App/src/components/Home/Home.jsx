import { useState, useEffect, useContext } from 'react'
import { MovieContext } from '../../contexts/MovieContext';

import { getTopActorPair } from '../../utils//actorsPairMoviesMapper';

import styles from './home.module.css'
export const Home = () => {
    const { data, moviesMappedWithRoles } = useContext(MovieContext);
    const [topActorPair, setTopActorPair] = useState([]);

    useEffect(() => {
        const actorPair = getTopActorPair(moviesMappedWithRoles);
        setTopActorPair(actorPair);
    }, [moviesMappedWithRoles]);

    const [actorIdPair, moviesPlayed] = topActorPair;
    const [firstActorId, secondActorId] = actorIdPair?.split("-") || [];
    const [firstActor, secondActor] = data.actors.filter((el) => (el.ID == firstActorId || el.ID == secondActorId));

    const sharedMoviesCount = moviesPlayed?.length;

    return (
        <section className={styles.home}>
            <article>
                <div className={styles.actorsInformationContainer}>
                    <h4>Top pair of actors:</h4>
                    <div>
                        <p>{firstActor?.FullName}</p>
                        <p>{secondActor?.FullName}</p>
                    </div>
                </div>
                <ul className={styles.moviesInformationContainer}>
                    <h4>Shared Movies List:</h4>
                    {moviesPlayed?.map((currentMovie) => (
                        <li key={currentMovie.ID}>
                            <p>
                                {currentMovie.Title}
                            </p>
                        </li>
                    ))}
                </ul>
                <div className={styles.moviesCountContainer}>
                    <h4>Shared Movies Count: </h4>
                    <p>{sharedMoviesCount}</p>
                </div>
            </article>
        </section>
    )
}