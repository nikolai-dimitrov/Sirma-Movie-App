import { useState, useEffect, useContext } from 'react'
import { MovieContext } from '../../contexts/MovieContext';
export const Actors = () => {
    const { data, actorsMappedWithRoles, addActor } = useContext(MovieContext);

    return (
        <>
        <button onClick={addActor}>Add Actor</button>
            <ul>
                {data.actors.map(currentActor => (
                    <li key={currentActor.ID}>
                        {currentActor.FullName}
                        <h3>Movies:</h3>
                        {actorsMappedWithRoles[currentActor.ID]?.map((currentRole => (
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