import { useState, useContext, useMemo } from 'react'

import { MovieContext } from '../../contexts/MovieContext'
import { ActorForm } from './ActorForm/ActorForm'
import { RoleModal } from './RoleModal/RoleModal'
import { Input } from '../input/Input'
import { useDebouncedSearch } from '../../hooks/useDebouncedSearch'

import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

import styles from './actors.module.css'

export const Actors = () => {
    const { actorsMappedWithRoles, moviesMappedWithRoles, addActorHandler, updateActorHandler, deleteActorHandler, addRoleHandler, updateRoleHandler, deleteRoleHandler } = useContext(MovieContext);

    const [searchParam, setSearchParam] = useState('');
    const debouncedSearchParam = useDebouncedSearch(searchParam);

    const [toggledMovieDetailsId, setToggledMovieDetailsId] = useState(null);

    const [actor, setActor] = useState({});
    const [isActorUpdating, setIsActorUpdating] = useState(false);

    const [role, setRole] = useState({});
    const [isRoleUpdating, setIsRoleUpdating] = useState(false);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);


    const filteredActors = useMemo(() => actorsMappedWithRoles.filter((currentActor) => {
        return currentActor.FullName.toLowerCase().includes(debouncedSearchParam.toLowerCase());
    }), [actorsMappedWithRoles, debouncedSearchParam]);

    const finishActorUpdate = () => {
        setActor({});
        setIsActorUpdating(false);
    }

    const updateActorClickHandler = (currentActor) => {
        setActor(currentActor);
        setIsActorUpdating(true);

        if (actor == currentActor) {
            finishActorUpdate();
        }
    }

    const deleteActorClickHandler = (actorId) => {
        if (isActorUpdating) {
            finishActorUpdate();
        }

        deleteActorHandler(actorId);
    }

    const createRoleClickHandler = () => {
        setIsRoleUpdating(false);
        setIsRoleModalOpen(true);
    }

    const updateRoleClickHandler = (currentRole) => {
        setRole(currentRole);
        setIsRoleUpdating(true);
        setIsRoleModalOpen(true);
    }

    const deleteRoleClickHandler = (roleId) => {
        deleteRoleHandler(roleId);
    }

    const closeRoleModal = () => {
        setIsRoleModalOpen(false);
    }

    const toggleMovieDetails = (currentMovie) => {
        setToggledMovieDetailsId(currentMovie.ID);
        if (currentMovie.ID == toggledMovieDetailsId) {
            setToggledMovieDetailsId(null);
        }
    }

    // TODO: Rename 
    const onChangeHandler = (e) => {
        setSearchParam(e.target.value);
    }

    return (
        <section className={styles.actors}>
            <ActorForm actor={actor} submitHandler={isActorUpdating ? updateActorHandler : addActorHandler} finishUpdate={finishActorUpdate} isUpdating={isActorUpdating} />
            <div className={styles.searchInputWrapper}>
                <Input
                    type={"text"}
                    id={"SearchInput"}
                    name={"SearchParam"}
                    placeholder={'Search Actors'}
                    onChangeHandler={onChangeHandler}
                    value={searchParam}
                />
            </div>
            {isRoleModalOpen && <RoleModal role={role} actorsMappedWithRoles={actorsMappedWithRoles} moviesMappedWithRoles={moviesMappedWithRoles} submitHandler={isActorUpdating ? updateRoleHandler : addRoleHandler} isUpdating={isRoleUpdating} closeRoleModal={closeRoleModal} />}
            <button onClick={createRoleClickHandler}>Create Role</button>
            <ul className={styles.actorsList}>
                {filteredActors?.map(currentActor => (
                    <li key={currentActor.ID} className={styles.actorItem}>
                        <div className={styles.actorSummary}>
                            <div className={styles.titleContainer}>
                                <p onClick={() => toggleMovieDetails(currentActor)} className={styles.title}>{currentActor.FullName}</p>
                            </div>
                            <div className={styles.buttonsContainer}>
                                <button className={styles.updateBtn} onClick={() => updateActorClickHandler(currentActor)}><FaEdit /></button>
                                <button className={styles.deleteBtn} onClick={() => deleteActorClickHandler(currentActor.ID)}><MdDelete /></button>
                            </div>
                        </div>

                        <div className={toggledMovieDetailsId == currentActor.ID ? `${styles.detailsContainer}` : `${styles.detailsContainer} ${styles.hidden}`}>
                            <p >Birth Date: {currentActor.BirthDate}</p>
                            {currentActor.roles.length > 0 && (
                                <div>
                                    <div className={styles.detailsHeadingContainer}>
                                        <h4>Movies:</h4>
                                        <h4>Roles:</h4>
                                    </div>
                                    <div>
                                        {currentActor.roles.map((currentRole, index) => (
                                            <div key={currentRole.ID} className={styles.roleItemContainer}>
                                                <div className={styles.roleItem}>
                                                    <p className={styles.movieTitle} key={index}>{currentRole.MovieDetails.Title}</p>
                                                    <p className={styles.roleName}>{currentRole.RoleName == 'null' ? 'Unnamed' : currentRole.RoleName}</p>
                                                </div>
                                                <div className={styles.buttonsContainer}>
                                                    <button className={styles.updateBtn} onClick={() => updateRoleClickHandler(currentRole)}><FaEdit /></button>
                                                    <button className={styles.deleteBtn} onClick={() => deleteRoleClickHandler(currentRole.ID)}><MdDelete /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                            }
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}