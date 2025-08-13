import { useState, useEffect } from 'react'

import { useForm } from '../../../hooks/useForm'
import { Input } from '../../input/Input'

import { IoMdAdd } from 'react-icons/io'
import { GiSaveArrow } from 'react-icons/gi'

import styles from './movie-form.module.css'
export const MovieForm = ({ movie, submitHandler, finishUpdate, isUpdating }) => {
    const [initialFormValues, setInitialFormValues] = useState({
        'Title': "",
        'ReleaseDate': ""
    });
    const { formValues, formErrors, onChangeHandler, onSubmitHandler } = useForm(initialFormValues, submitHandler);

    useEffect(() => {
        setInitialFormValues({
            'Title': isUpdating ? movie.Title : '',
            'ReleaseDate': isUpdating ? movie.ReleaseDate : ''

        });
    }, [movie]);

    const onFormSubmitHandler = (e, movieId) => {
        onSubmitHandler(e, movieId);
        finishUpdate();
    };
    console.log(serverError)
    return (
        <form className={styles.movieForm} action="" onSubmit={(e) => onFormSubmitHandler(e, movie.ID)}>
            <div className={styles.inputWrapper}>
                <label htmlFor="Title">Movie Name</label>
                <Input
                    type={"text"}
                    id={"Title"}
                    name={"Title"}
                    onChangeHandler={onChangeHandler}
                    value={formValues["Title"]}
                />
                {formErrors['Title'] && <p className={styles.formError}>{formErrors['Title']}</p>}

            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="Title">Release Date</label>
                <Input
                    type={"date"}
                    id={"ReleaseDate"}
                    name={"ReleaseDate"}
                    onChangeHandler={onChangeHandler}
                    value={formValues["ReleaseDate"]}
                />
                {formErrors['ReleaseDate'] && <p className={styles.formError}>{formErrors['ReleaseDate']}</p>}
            </div>
            <button>{isUpdating ? <GiSaveArrow /> : <IoMdAdd />}</button>
        </form>
    )
}