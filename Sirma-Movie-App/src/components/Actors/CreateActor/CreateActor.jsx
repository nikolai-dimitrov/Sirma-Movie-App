import { useForm } from '../../../hooks/useForm'

export const CreateActor = ({ addActorHandler}) => {
    const { formValues, onChangeHandler, onSubmitHandler } = useForm({
        'FullName': '',
        'BirthDate': ''
    }, addActorHandler);

    return (
        <div>
            <form action="" onSubmit={(e) => onSubmitHandler(e)}>
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
                <button>Add Actor</button>
            </form>
        </div>
    )
}