import { useForm } from '../../../hooks/useForm'

export const CreateMovie = ({ addMovieHandler}) => {
    const { formValues, onChangeHandler, onSubmitHandler } = useForm({
        'Title': '',
        'ReleaseDate': ''
    }, addMovieHandler);

    return (
        <div>
            <form action="" onSubmit={(e) => onSubmitHandler(e)}>
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
                    value={formValues['ReleaseDate']}
                />
                <button>Add Movie</button>
            </form>
        </div>
    )
}