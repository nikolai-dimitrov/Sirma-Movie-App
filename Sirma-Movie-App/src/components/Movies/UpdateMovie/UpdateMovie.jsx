import { useEffect } from 'react'
import { useForm } from '../../../hooks/useForm'
export const UpdateMovie = ({ movie, updateMovieHandler, switchUpdateItemPrompt }) => {
    const { formValues, onChangeHandler, onSubmitHandler } = useForm({
        'Title': movie.Title,
        'ReleaseDate': movie.ReleaseDate
    }, updateMovieHandler);

    const onFormSubmitHandler = (e, movieId) => {
        onSubmitHandler(e, movieId);
        switchUpdateItemPrompt(null);
    }

    return (
        <>
            <form action='' onSubmit={(e) => onFormSubmitHandler(e, movie.ID)}>
                <input
                    type='text'
                    id='title'
                    name='Title'
                    onChange={onChangeHandler}
                    value={formValues['Title']}
                />

                <input
                    type='date'
                    id='title'
                    name='ReleaseDate'
                    onChange={onChangeHandler}
                    value={formValues['ReleaseDate']} />
                <button>Update</button>
            </form>
        </>
    )
}