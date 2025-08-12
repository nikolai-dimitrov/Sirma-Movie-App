import { useState, useEffect, useContext } from 'react'
import { MovieContext } from '../../contexts/MovieContext';

import { getTopActorPair } from '../../utils//actorsPairMoviesMapper';

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
        <>
            <h1>Home</h1>
            <p>Total Shared Movies: {sharedMoviesCount}</p>
            <p>{firstActor?.FullName}</p>
            <p>{secondActor?.FullName}</p>
            {moviesPlayed?.map((currentMovie) => (
                <p key={currentMovie.ID}>{currentMovie.Title}</p>
            ))}
        </>
    )
}