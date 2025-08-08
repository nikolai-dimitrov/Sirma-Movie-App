import { useState, useEffect, useContext } from 'react'
import { MovieContext } from '../../contexts/MovieContext';

export const Movies = () => {
    const { data, moviesMappedWithRoles } = useContext(MovieContext);
    const actorsById = Object.fromEntries(data.actors.map((currentActor) => [currentActor.ID, currentActor]))

    return (
        <ul>
            {data.movies.map(currentMovie => (
                <li key={currentMovie.ID}>
                    <p>{currentMovie.Title} - {currentMovie.ReleaseDate}</p>
                    {moviesMappedWithRoles[currentMovie.ID]?.map((currentRole, index) => (
                        <p key={index}>{currentRole.RoleName == 'null' ? 'Unnamed' : currentRole.RoleName} - {actorsById[currentRole.ActorID].FullName}</p>
                    ))}
                </li>
            ))}
        </ul>
    )
}