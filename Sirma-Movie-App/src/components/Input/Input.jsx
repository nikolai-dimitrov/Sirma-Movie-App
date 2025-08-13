import styles from './input.module.css'
export const Input = ({ type, id, name, placeholder, onChangeHandler, value }) => {
    return (
        <input
            className={styles.input}
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            onChange={onChangeHandler}
            value={value}
        />
    )
}