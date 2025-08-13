import { useState, useEffect } from "react"

import { useForm } from '../../../hooks/useForm'
import { Input } from '../../Input/Input'

import { IoMdAdd } from 'react-icons/io'
import { GiSaveArrow } from 'react-icons/gi'

import styles from './actor-form.module.css'

export const ActorForm = ({ actor, submitHandler, finishUpdate, isUpdating }) => {
    const [initialFormValues, setInitialFormValues] = useState({
        'FullName': '',
        'BirthDate': ''
    });
    const { formValues, formErrors, onChangeHandler, onSubmitHandler } = useForm(initialFormValues, submitHandler);

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
                <label htmlFor="FullName">Name</label>
                <Input
                    id={"FullName"}
                    name={"FullName"}
                    onChangeHandler={onChangeHandler}
                    value={formValues["FullName"]}
                />
                {formErrors['FullName'] && <p className={styles.formError}>{formErrors['FullName']}</p>}
            </div>

            <div className={styles.inputWrapper}>
                <label htmlFor="BirthDate">Birth Date</label>
                <Input
                    type={"date"}
                    id={"BirthDate"}
                    name={"BirthDate"}
                    onChangeHandler={onChangeHandler}
                    value={formValues["BirthDate"]}
                />
                {formErrors['BirthDate'] && <p className={styles.formError}>{formErrors['BirthDate']}</p>}

            </div>
            <button>{isUpdating ? <GiSaveArrow /> : <IoMdAdd />}</button>
        </form>
    )
}