import { useState, useEffect, useContext, useMemo } from 'react'

import { MovieContext } from '../../contexts/MovieContext';
import { ActorForm } from './ActorForm/ActorForm';
import { Input } from '../input/Input';
import { useDebouncedSearch } from '../../hooks/useDebouncedSearch';

import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

import styles from './actors.module.css'

export const Actors = () => {
    const { data, addActorHandler, updateActorHandler, deleteActorHandler, serverError, clearServerErrors } = useContext(MovieContext);

    const [searchParam, setSearchParam] = useState('');
    const debouncedSearchParam = useDebouncedSearch(searchParam);

    const [toggledMovieDetailsId, setToggledMovieDetailsId] = useState(null);


    const [actor, setActor] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        clearServerErrors();
    }, []);

    const filteredActorsIds = useMemo(() => data.allActorsIds.filter((currentActorId) => {
        return data.actorsByIds[currentActorId].FullName.toLowerCase().includes(debouncedSearchParam.toLowerCase());
    }), [data.allActorsIds, data.actorsByIds, debouncedSearchParam]);

    const finishUpdate = () => {
        setActor({});
        setIsUpdating(false);
    }

    const updateClickHandler = (currentActor) => {
        if (actor == currentActor) {
            finishUpdate();
        } else {
            setActor(currentActor);
            setIsUpdating(true);
        }
    }

    const deleteClickHandler = (actorId) => {
        if (isUpdating) {
            finishUpdate();
        }

        deleteActorHandler(actorId);
    }

    const toggleActorDetails = (currentMovie) => {
        if (currentMovie.ID == toggledMovieDetailsId) {
            setToggledMovieDetailsId(null);
        } else {
            setToggledMovieDetailsId(currentMovie.ID);
        }
    }

    const onChangeHandler = (e) => {
        setSearchParam(e.target.value);
    }

    return (
        <section className={styles.actors}>
            <ActorForm actor={actor} submitHandler={isUpdating ? updateActorHandler : addActorHandler} finishUpdate={finishUpdate} isUpdating={isUpdating} />
            {serverError && <p className={styles.serverError}>{serverError}</p>}
            <div className={styles.searchInputWrapper}>
                <Input
                    type="text"
                    id={"SearchInput"}
                    name={"SearchParam"}
                    placeholder={'Search Actors'}
                    onChangeHandler={onChangeHandler}
                    value={searchParam}
                />
            </div>
            <ul className={styles.actorsList}>
                {filteredActorsIds?.map(currentActorId => {
                    const currentActor = data.actorsByIds[currentActorId]
                    return (
                        <li key={currentActor.ID} className={styles.actorItem}>
                            <div className={styles.actorSummary}>
                                <div className={styles.titleContainer}>
                                    <p onClick={() => toggleActorDetails(currentActor)} className={styles.title}>{currentActor.FullName}</p>
                                </div>
                                <div className={styles.buttonsContainer}>
                                    <button className={styles.updateBtn} onClick={() => updateClickHandler(currentActor)}><FaEdit /></button>
                                    <button className={styles.deleteBtn} onClick={() => deleteClickHandler(currentActor.ID)}><MdDelete /></button>
                                </div>
                            </div>

                            <div className={styles.detailsContainer}>
                                <div className={toggledMovieDetailsId == currentActor.ID ? `` : `${styles.hidden}`}>
                                    <p >Birth Date: {currentActor.BirthDate}</p>
                                    {currentActor.roles?.length > 0 && <h4>Movies and Roles:</h4>}
                                    {currentActor.roles?.map((currentRoleId, index) => {
                                        const currentRole = data.rolesByIds[currentRoleId];
                                        const currentMovieId = currentRole.MovieID;
                                        const currentMovie = data.moviesByIds[currentMovieId]
                                        return (
                                            <p className={styles.movieDetails} key={index}>{currentMovie.Title} - {currentRole.RoleName == 'NULL' ? 'Unnamed' : currentRole.RoleName}</p>
                                        )
                                    })}
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}