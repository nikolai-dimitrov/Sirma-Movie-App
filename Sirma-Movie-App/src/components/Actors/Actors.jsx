import { useState, useContext } from 'react'

import { MovieContext } from '../../contexts/MovieContext';
import { ActorForm } from './ActorForm/ActorForm';

import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

export const Actors = () => {
    const { actorsMappedWithRoles, addActorHandler, updateActorHandler, deleteActorHandler, addRole } = useContext(MovieContext);

    const [actor, setActor] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);

    const finishUpdate = () => {
        setActor({});
        setIsUpdating(false);
    }

    const updateClickHandler = (currentActor) => {
        setActor(currentActor)
        setIsUpdating(true);

        if (actor == currentActor) {
            finishUpdate();
        }
    }

    const deleteClickHandler = (actorId) => {
        if (isUpdating) {
            finishUpdate();
        }

        deleteActorHandler(actorId)
    }
    return (
        <>
            <ActorForm actor={actor} submitHandler={isUpdating ? updateActorHandler : addActorHandler} finishUpdate={finishUpdate} isUpdating={isUpdating} />
            <button onClick={addRole}>Add Role</button>
            <ul>
                {actorsMappedWithRoles?.map(currentActor => (
                    <li key={currentActor.ID}>
                        <div>
                            <p>{currentActor.FullName}</p>
                            <h3>Movies:</h3>
                            {currentActor.roles.map((currentRole => (
                                <p key={`${currentActor.ID} - ${currentRole.MovieID}`}>
                                    {currentRole.MovieDetails.Title} - {currentRole.RoleName}
                                </p>
                            )))}
                        </div>
                        <div>
                            <button onClick={() => updateClickHandler(currentActor)}><FaEdit /></button>
                            <button onClick={() => deleteClickHandler(currentActor.ID)}><MdDelete /></button>
                        </div>

                    </li>
                ))}
            </ul>
        </>
    )
}