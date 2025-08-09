import { useState, useEffect, useContext } from 'react'
import { MovieContext } from '../../contexts/MovieContext';
export const Actors = () => {
    const { actorsMappedWithRoles, addActor } = useContext(MovieContext);
    
    return (
        <>
            <button onClick={addActor}>Add Actor</button>
            <ul>
                {actorsMappedWithRoles?.map(currentActor => (
                    <li key={currentActor.ID}>
                        {currentActor.FullName}
                        <h3>Movies:</h3>
                        {currentActor.roles.map((currentRole => (
                            <p key={`${currentActor.ID} - ${currentRole.MovieID}`}>
                                {currentRole.MovieDetails.Title} - {currentRole.RoleName}
                            </p>
                        )))}
                    </li>
                ))}
            </ul>
        </>
    )
}