import { useState, useContext } from 'react'

import { MovieContext } from '../../contexts/MovieContext';
import { ActorForm } from './ActorForm/ActorForm';

import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

import styles from './actors.module.css'

export const Actors = () => {
    const { actorsMappedWithRoles, addActorHandler, updateActorHandler, deleteActorHandler, addRole } = useContext(MovieContext);
    const [toggledMovieDetailsId, setToggledMovieDetailsId] = useState(null);


    const [actor, setActor] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);

    const finishUpdate = () => {
        setActor({});
        setIsUpdating(false);
    }

    const updateClickHandler = (currentActor) => {
        setActor(currentActor);
        setIsUpdating(true);

        if (actor == currentActor) {
            finishUpdate();
        }
    }

    const deleteClickHandler = (actorId) => {
        if (isUpdating) {
            finishUpdate();
        }

        deleteActorHandler(actorId);
    }

    const toggleMovieDetails = (currentMovie) => {
        setToggledMovieDetailsId(currentMovie.ID);
        if (currentMovie.ID == toggledMovieDetailsId) {
            setToggledMovieDetailsId(null);
        }
    }
    return (
        <section className={styles.actors}>
            <ActorForm actor={actor} submitHandler={isUpdating ? updateActorHandler : addActorHandler} finishUpdate={finishUpdate} isUpdating={isUpdating} />
            <ul className={styles.actorsList}>
                {actorsMappedWithRoles?.map(currentActor => (
                    <li key={currentActor.ID} className={styles.actorItem}>
                        <div className={styles.actorSummary}>
                            <div className={styles.titleContainer}>
                                <p onClick={() => toggleMovieDetails(currentActor)} className={styles.title}>{currentActor.FullName}</p>
                            </div>
                            <div className={styles.buttonsContainer}>
                                <button className={styles.updateBtn} onClick={() => updateClickHandler(currentActor)}><FaEdit /></button>
                                <button className={styles.deleteBtn} onClick={() => deleteClickHandler(currentActor.ID)}><MdDelete /></button>
                            </div>
                        </div>

                        <div className={styles.detailsContainer}>
                            <div className={toggledMovieDetailsId == currentActor.ID ? `` : `${styles.hidden}`}>
                                <p >Birth Date: {currentActor.BirthDate}</p>
                                {currentActor.roles.length > 0 && <h4>Movies and Roles:</h4>}
                                {currentActor.roles.map((currentRole, index) => (
                                    <p className={styles.movieDetails} key={index}>{currentRole.MovieDetails.Title} - {currentRole.RoleName == 'NULL' ? 'Unnamed' : currentRole.RoleName}</p>
                                ))}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}