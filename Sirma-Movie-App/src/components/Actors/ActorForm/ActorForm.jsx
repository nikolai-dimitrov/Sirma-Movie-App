import { useState, useEffect } from "react"

import { useForm } from "../../../hooks/useForm"

import { IoMdAdd } from 'react-icons/io'
import { GiSaveArrow } from 'react-icons/gi'

import styles from './actor-form.module.css'

export const ActorForm = ({ actor, submitHandler, finishUpdate, isUpdating }) => {
    const [initialFormValues, setInitialFormValues] = useState({
        'FullName': '',
        'BirthDate': ''
    });
    const { formValues, onChangeHandler, onSubmitHandler } = useForm(initialFormValues, submitHandler);

    useEffect(() => {
        setInitialFormValues({
            'FullName': isUpdating ? actor.FullName : '',
            'BirthDate': isUpdating ? actor.BirthDate : ''

        });
    }, [actor]);

    const onFormSubmitHandler = (e, actorId) => {
        onSubmitHandler(e, actorId);
        finishUpdate();
    };

    return (
        <form className={styles.actorForm} action="" onSubmit={(e) => onFormSubmitHandler(e, actor.ID)}>
            <div className={styles.inputWrapper}>
                <label htmlFor="Title">Name</label>
                <input
                    id='FullName'
                    name='FullName'
                    onChange={onChangeHandler}
                    value={formValues['FullName']}
                />
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="Title">Birth Date</label>
                <input
                    type='date'
                    id='BirthDate'
                    name='BirthDate'
                    onChange={onChangeHandler}
                    value={formValues['BirthDate']}
                />
            </div>
            <button>{isUpdating ? <GiSaveArrow /> : <IoMdAdd />}</button>
        </form>
    )
}