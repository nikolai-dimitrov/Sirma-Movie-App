import { useForm } from '../../../hooks/useForm'
export const UpdateMovie = ({ movie, updateMovieHandler, switchUpdateItemPrompt }) => {
    const { formValues, onChangeHandler, onSubmitHandler } = useForm({
        'Title': movie.Title,
        'ReleaseDate': movie.ReleaseDate
    }, updateMovieHandler);

    return (
        <>
            <form action='' onSubmit={(e) => onSubmitHandler(e, movie.ID)}>
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