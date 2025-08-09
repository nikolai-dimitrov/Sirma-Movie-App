import { useState, useEffect, useContext } from 'react'
import { MovieContext } from '../../contexts/MovieContext';

export const Movies = () => {
    const { moviesMappedWithRoles, addMovie, addRole } = useContext(MovieContext);

    return (
        <>
            <button onClick={addMovie}>Add Movie</button>
            <button onClick={addRole}>Add Role</button>
            <ul>
                {moviesMappedWithRoles.map(currentMovie => (
                    <li key={currentMovie.ID}>
                        <p>{currentMovie.Title} - {currentMovie.ReleaseDate}</p>
                        {currentMovie.roles.map((currentRole, index) => (
                            <p key={index}>{currentRole.RoleName == 'null' ? 'Unnamed' : currentRole.RoleName} - {currentRole.ActorDetails?.FullName}</p>
                        ))}
                    </li>
                ))}
            </ul>
        </>
    )
}