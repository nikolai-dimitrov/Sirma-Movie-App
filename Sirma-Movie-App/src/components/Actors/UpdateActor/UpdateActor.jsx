import { useForm } from '../../../hooks/useForm'
export const UpdateActor = ({ actor, updateActorHandler, switchUpdateItemPrompt }) => {
    const { formValues, onChangeHandler, onSubmitHandler } = useForm({
        'FullName': actor.FullName,
        'BirthDate': actor.BirthDate,
    }, updateActorHandler);

    const onFormSubmitHandler = (e, actorId) => {
        onSubmitHandler(e, actorId);
        switchUpdateItemPrompt(null);
    }

    return (
        <>
            <form action='' onSubmit={(e) => onFormSubmitHandler(e, actor.ID)}>
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
                    value={formValues['BirthDate']} />
                <button>Update</button>
            </form>
        </>
    )
}