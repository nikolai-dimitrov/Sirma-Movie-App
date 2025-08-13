import { useState, useEffect, useMemo } from 'react'

import { useForm } from '../../../hooks/useForm'

import styles from './role-modal.module.css'
export const RoleModal = ({ role, actorsMappedWithRoles, moviesMappedWithRoles, submitHandler, isUpdating, closeRoleModal }) => {
    const [initialFormValues, setInitialFormValues] = useState({
        'RoleName': '',
        'MovieID': '',
        'ActorID': '',
    });
    const { formValues, onChangeHandler, onSubmitHandler } = useForm(initialFormValues, submitHandler);

    useEffect(() => {
        setInitialFormValues({
            'RoleName': isUpdating ? role.RoleName : '',
            'MovieID': isUpdating ? role.MovieID : '',
            'ActorID': isUpdating ? role.ActorID : '',

        });
    }, [role]);

    const onFormSubmitHandler = (e, roleId) => {
        onSubmitHandler(e, roleId);
        closeRoleModal();
    }

    // Filter movies in which current actor haven't acted in yet
    const filteredMovies = useMemo(() => {
        const alreadyPlayedMovieIds = actorsMappedWithRoles.find(currentActor => currentActor.ID == formValues['ActorID'])?.roles.map((currentRole => currentRole.MovieID));

        let filteredMovies = moviesMappedWithRoles;
        if (alreadyPlayedMovieIds && !isUpdating) {
            filteredMovies = moviesMappedWithRoles.filter(currentMovie => !alreadyPlayedMovieIds.includes(currentMovie.ID))
        };

        return filteredMovies;
    }, [formValues['ActorID']]);

    return (
        <>
            <form action="" onSubmit={(e) => onFormSubmitHandler(e, role.ID)}>
                <select name="ActorID" value={formValues['ActorID']} onChange={onChangeHandler} disabled={isUpdating && true}>
                    {actorsMappedWithRoles.map((currentActor, index) => (
                        <option key={index} value={currentActor.ID}>{currentActor.FullName}</option>
                    ))}
                </select>
                {/* If user hasn't selected actor disable movie id */}
                <select name="MovieID" value={formValues['MovieID']} onChange={onChangeHandler} disabled={formValues['ActorID'] == '' && true}>
                    {filteredMovies.map((currentMovie, index) => (
                        <option key={index} value={currentMovie.ID}>{currentMovie.Title}</option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="role"
                    id="RoleName"
                    name="RoleName"
                    onChange={onChangeHandler}
                    value={formValues["RoleName"]} />
                <button>Save</button>
            </form>
            <button onClick={closeRoleModal}>Close</button>
        </>
    )
}