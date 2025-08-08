import { useState, useEffect, useContext } from 'react'
import { MovieContext } from '../../contexts/MovieContext';
export const Actors = () => {
    const { data, dataById, actorsMappedWithRoles } = useContext(MovieContext);

    return (
        <ul>
            {data.actors.map(currentActor => (
                <li key={currentActor.ID}>
                    {currentActor.FullName}
                    <h3>Movies:</h3>
                    {actorsMappedWithRoles[currentActor.ID]?.map((currentElement => (
                        <p key={`${currentActor.ID} - ${currentElement.MovieID}`}>
                            {dataById.moviesObj[currentElement.MovieID].Title} - {currentElement.RoleName}
                        </p>
                    )))}
                </li>
            ))}
        </ul>
    )
}