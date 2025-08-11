import { useState, useEffect } from "react"

import { useForm } from "../../../hooks/useForm"

import { IoMdAdd } from 'react-icons/io'
import { GiSaveArrow } from 'react-icons/gi'

import styles from './movie-form.module.css'
export const MovieForm = ({ movie, submitHandler, finishUpdate, isUpdating }) => {
    const [initialFormValues, setInitialFormValues] = useState({
        'Title': "",
        'ReleaseDate': ""
    });
    const { formValues, onChangeHandler, onSubmitHandler } = useForm(initialFormValues, submitHandler);

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


    return (
        <form className={styles.movieForm} action="" onSubmit={(e) => onFormSubmitHandler(e, movie.ID)}>
            <div className={styles.inputWrapper}>
                <label htmlFor="Title">Movie Name</label>
                <input
                    type='text'
                    id='Title'
                    name='Title'
                    onChange={onChangeHandler}
                    value={formValues['Title']}
                />

            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="Title">Release Date</label>
                <input
                    type='date'
                    id='ReleaseDate'
                    name='ReleaseDate'
                    onChange={onChangeHandler}
                    value={formValues['ReleaseDate']}
                />

            </div>
            <button>{isUpdating ? <GiSaveArrow /> : <IoMdAdd />}</button>
        </form>
    )
}