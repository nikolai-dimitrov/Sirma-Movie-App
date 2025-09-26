import { useState, useEffect, useContext, useMemo } from 'react'

import { MovieContext } from '../../contexts/MovieContext'
import { MovieForm } from './MovieForm/MovieForm'
import { Input } from '../Input/Input'
import { useDebouncedSearch } from '../../hooks/useDebouncedSearch'

import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

import styles from './movies.module.css'

export const Movies = () => {
    const { moviesMappedWithRoles, addMovieHandler, updateMovieHandler, deleteMovieHandler, serverError, clearServerErrors } = useContext(MovieContext);
    const [movie, setMovie] = useState({});
    const [searchParam, setSearchParam] = useState('');
    const debouncedSearchParam = useDebouncedSearch(searchParam);
    const [isUpdating, setIsUpdating] = useState(false);
    const [toggledMovieDetailsId, setToggledMovieDetailsId] = useState(null);

    useEffect(() => {
        clearServerErrors();
    }, []);

    const filteredMovies = useMemo(() => moviesMappedWithRoles.filter((currentMovie) => {
        return currentMovie.Title.toLowerCase().includes(debouncedSearchParam.toLowerCase());
    }), [moviesMappedWithRoles, debouncedSearchParam]);


    const finishUpdate = () => {
        setMovie({});
        setIsUpdating(false);
    }


    const updateClickHandler = (currentMovie) => {
        setMovie(currentMovie);
        setIsUpdating(true);

        if (movie == currentMovie) {
            finishUpdate();
        }
    }

    const deleteClickHandler = (movieId) => {
        if (isUpdating) {
            finishUpdate();
        }

        deleteMovieHandler(movieId);
    }

    const toggleMovieDetails = (currentMovie) => {
        setToggledMovieDetailsId(currentMovie.ID);

        if (currentMovie.ID == toggledMovieDetailsId) {
            setToggledMovieDetailsId(null);
        }
    }

    const onChangeHandler = (e) => {
        setSearchParam(e.target.value);

    }

    return (
        <section className={styles.movies}>
            <MovieForm movie={movie} submitHandler={isUpdating ? updateMovieHandler : addMovieHandler} finishUpdate={finishUpdate} isUpdating={isUpdating} />
            {serverError && <p className={styles.serverError}>{serverError}</p>}
            <div className={styles.searchInputWrapper}>
                <Input
                    type={"text"}
                    id={"SearchParam"}
                    name={"SearchParam"}
                    placeholder={"Search Movie Title"}
                    onChangeHandler={onChangeHandler}
                    value={searchParam}
                />
            </div>
            <ul className={styles.moviesList}>
                {filteredMovies?.map(currentMovie => (
                    <li key={currentMovie.ID} className={styles.movieItem}>
                        <div className={styles.movieSummary}>
                            <div className={styles.titleContainer}>
                                <p onClick={() => toggleMovieDetails(currentMovie)} className={styles.title}>{currentMovie.Title}</p>
                            </div>
                            <div className={styles.buttonsContainer}>
                                <button className={styles.updateBtn} onClick={() => updateClickHandler(currentMovie)}><FaEdit /></button>
                                <button className={styles.deleteBtn} onClick={() => deleteClickHandler(currentMovie.ID)}><MdDelete /></button>
                            </div>
                        </div>

                        <div className={styles.detailsContainer}>
                            <div className={toggledMovieDetailsId == currentMovie.ID ? `` : `${styles.hidden}`}>
                                <p>Release Date: {currentMovie.ReleaseDate}</p>
                                {currentMovie.roles?.length > 0 && <h4>Actors and Roles:</h4>}
                                {currentMovie.roles?.map((currentRole, index) => (
                                    <p className={styles.actorDetails} key={index}>{currentRole.ActorDetails?.FullName} - {currentRole.RoleName == 'NULL' ? 'Unnamed' : currentRole.RoleName}</p>
                                ))}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}