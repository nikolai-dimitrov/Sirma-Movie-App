import { useState, useEffect } from "react"

import { useForm } from "../../../hooks/useForm"

import { IoMdAdd } from 'react-icons/io'
import { GiSaveArrow } from 'react-icons/gi'

export const ActorForm = ({ actor, submitHandler, finishUpdate, isUpdating }) => {
    const [initialFormValues, setInitialFormValues] = useState({
        'FullName': '',
        'BirthDate': ''
    });
    const { formValues, onChangeHandler, onSubmitHandler } = useForm(initialFormValues, submitHandler);

    useEffect(() => {
        setInitialFormValues({
            'FullName': isUpdating ? actor.FullName : '',
            'BirthDate': isUpdating ? actor.BirthDate: ''

        });
    }, [actor]);

    const onFormSubmitHandler = (e, actorId) => {
        onSubmitHandler(e, actorId);
        finishUpdate();
    };

    return (
        <form action="" onSubmit={(e) => onFormSubmitHandler(e, actor.ID)}>
            <input
                type='text'
                id='FullName'
                name='FullName'
                onChange={onChangeHandler}
                value={formValues['FullName']}
            />

            <input
                type='date'
                id='BirthDate'
                name='BirthDate'
                onChange={onChangeHandler}
                value={formValues['BirthDate']}
            />
            <button>{isUpdating ? <GiSaveArrow /> : <IoMdAdd />}</button>
        </form>
    )
}