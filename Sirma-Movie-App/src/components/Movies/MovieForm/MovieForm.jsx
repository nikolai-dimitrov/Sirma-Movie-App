import { useState, useEffect } from "react"

import { useForm } from "../../../hooks/useForm"

import { IoMdAdd } from 'react-icons/io'
import { GiSaveArrow } from 'react-icons/gi'


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
        <form action="" onSubmit={(e) => onFormSubmitHandler(e, movie.ID)}>
            <input
                type='text'
                id='Title'
                name='Title'
                onChange={onChangeHandler}
                value={formValues['Title']}
            />

            <input
                type='date'
                id='ReleaseDate'
                name='ReleaseDate'
                onChange={onChangeHandler}
                value={formValues['ReleaseDate']}
            />
            <button>{isUpdating ? <GiSaveArrow /> : <IoMdAdd />}</button>
        </form>
    )
}