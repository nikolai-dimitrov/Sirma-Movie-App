import { useState, useEffect, useContext } from 'react'
import { MovieContext } from '../../contexts/MovieContext';

import { CreateActor } from './CreateActor/CreateActor';
import { UpdateActor } from './UpdateActor/UpdateActor'
export const Actors = () => {
    const { actorsMappedWithRoles, addActorHandler, updateActorHandler, deleteActorHandler, addRole } = useContext(MovieContext);

    const [updateItemId, setUpdateItemId] = useState(null);

    const switchUpdateItemPrompt = (actorId) => {
        updateItemId ? setUpdateItemId(null) : setUpdateItemId(actorId);
    }

    return (
        <>
            <CreateActor addActorHandler={addActorHandler} />

            <button onClick={addRole}>Add Role</button>
            <ul>
                {actorsMappedWithRoles?.map(currentActor => (
                    <li key={currentActor.ID}>
                        <div>
                            {updateItemId == currentActor.ID ?
                                <>
                                    <UpdateActor actor={currentActor} updateActorHandler={updateActorHandler} switchUpdateItemPrompt={switchUpdateItemPrompt} />
                                </> :
                                <>
                                    <p>{currentActor.FullName}</p>
                                </>

                            }

                            <h3>Movies:</h3>
                            {currentActor.roles.map((currentRole => (
                                <p key={`${currentActor.ID} - ${currentRole.MovieID}`}>
                                    {currentRole.MovieDetails.Title} - {currentRole.RoleName}
                                </p>
                            )))}
                        </div>
                        <div>
                            <button onClick={() => switchUpdateItemPrompt(currentActor.ID)}>|</button>
                            <button onClick={() => deleteActorHandler(currentActor.ID)}>X</button>
                        </div>

                    </li>
                ))}
            </ul>
        </>
    )
}