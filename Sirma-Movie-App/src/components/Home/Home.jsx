import { useContext } from 'react'
import { MovieContext } from '../../contexts/MovieContext';
export const Home = () => {
    const { data, topActorPair } = useContext(MovieContext);

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