import { useState, useContext } from 'react'

import { MovieContext } from '../../contexts/MovieContext'
import { MovieForm } from './MovieForm/MovieForm'

import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

import styles from './movies.module.css'

export const Movies = () => {
    const { moviesMappedWithRoles, addMovieHandler, updateMovieHandler, deleteMovieHandler } = useContext(MovieContext);
    const [movie, setMovie] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);
    const [toggledMovieDetailsId, setToggledMovieDetailsId] = useState(null);

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
        if(currentMovie.ID == toggledMovieDetailsId) {
            setToggledMovieDetailsId(null);
        }
    }


    return (
        <section className={styles.movies}>
            <MovieForm movie={movie} submitHandler={isUpdating ? updateMovieHandler : addMovieHandler} finishUpdate={finishUpdate} isUpdating={isUpdating} />
            <ul className={styles.moviesList}>
                {moviesMappedWithRoles?.map(currentMovie => (
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
                                {currentMovie.roles.length > 0 && <h4>Actors and Roles:</h4>}
                                {currentMovie.roles.map((currentRole, index) => (
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