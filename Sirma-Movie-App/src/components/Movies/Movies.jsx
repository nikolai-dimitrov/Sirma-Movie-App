import { useState, useContext } from 'react'
import { MovieContext } from '../../contexts/MovieContext'
import { CreateMovie } from './CreateMovie/CreateMovie'
import { UpdateMovie } from './UpdateMovie/UpdateMovie'

import styles from './movies.module.css'

export const Movies = () => {
    const { moviesMappedWithRoles, addMovieHandler, updateMovieHandler, deleteMovieHandler } = useContext(MovieContext);
    const [updateItemId, setUpdateItemId] = useState(null);

    const switchUpdateItemPrompt = (movieId) => {
        updateItemId ? setUpdateItemId(null) : setUpdateItemId(movieId);
    }

    return (
        <>
            <CreateMovie addMovieHandler={addMovieHandler} />
            <ul>
                {moviesMappedWithRoles?.map(currentMovie => (
                    <li key={currentMovie.ID}>
                        <div>
                            {updateItemId == currentMovie.ID ?
                                <>
                                    <UpdateMovie movie={currentMovie} updateMovieHandler={updateMovieHandler} switchUpdateItemPrompt={switchUpdateItemPrompt} />
                                </> :
                                <>
                                    <p>{currentMovie.Title} - {currentMovie.ReleaseDate}</p>
                                </>

                            }

                            {currentMovie.roles.map((currentRole, index) => (
                                <p key={index}>{currentRole.RoleName == 'null' ? 'Unnamed' : currentRole.RoleName} - {currentRole.ActorDetails?.FullName}</p>
                            ))}
                        </div>
                        <div>
                            <button onClick={() => switchUpdateItemPrompt(currentMovie.ID)}>|</button>
                            <button onClick={() => deleteMovieHandler(currentMovie.ID)}>X</button>
                        </div>

                    </li>
                ))}
            </ul>
        </>
    )
}