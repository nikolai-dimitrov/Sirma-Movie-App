import { useState, useEffect, useContext } from 'react'
import { MovieContext } from '../../contexts/MovieContext';

export const Movies = () => {
    const { data, moviesMappedWithRoles } = useContext(MovieContext);
    const actorsById = Object.fromEntries(data.actors.map((currentActor) => [currentActor.ID, currentActor]))

    return (
        <ul>
            {data.movies.map(currentMovie => (
                <div key={currentMovie.ID}>
                    <li>{currentMovie.Title}</li>
                    {moviesMappedWithRoles[currentMovie.ID]?.map((currentRole, index) => (
                        <p key={index} >{currentRole.RoleName} - {actorsById[currentRole.ActorID].FullName}</p>
                    ))}
                </div>
            ))}
        </ul>
    )
}