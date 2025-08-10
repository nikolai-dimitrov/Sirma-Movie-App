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

    const finishUpdate = () => {
        setMovie({});
        setIsUpdating(false);
    }


    const updateClickHandler = (currentMovie) => {
        setMovie(currentMovie)
        setIsUpdating(true);

        if (movie == currentMovie) {
            finishUpdate();
        }
    }

    const deleteClickHandler = (movieId) => {
        if (isUpdating) {
            finishUpdate();
        }

        deleteMovieHandler(movieId)
    }


    return (
        <>
            <MovieForm movie={movie} submitHandler={isUpdating ? updateMovieHandler : addMovieHandler} finishUpdate={finishUpdate} isUpdating={isUpdating} />
            <ul>
                {moviesMappedWithRoles?.map(currentMovie => (
                    <li key={currentMovie.ID}>
                        <div>
                            <p>{currentMovie.Title} - {currentMovie.ReleaseDate}</p>
                            {currentMovie.roles.map((currentRole, index) => (
                                <p key={index}>{currentRole.RoleName == 'null' ? 'Unnamed' : currentRole.RoleName} - {currentRole.ActorDetails?.FullName}</p>
                            ))}
                        </div>
                        <div>
                            <button onClick={() => updateClickHandler(currentMovie)}><FaEdit /></button>

                            <button onClick={() => deleteClickHandler(currentMovie.ID)}><MdDelete /></button>
                        </div>

                    </li>
                ))}
            </ul>
        </>
    )
}