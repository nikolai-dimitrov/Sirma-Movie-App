import { useEffect, useContext } from 'react'
import { MovieContext } from '../../contexts/MovieContext';
export const Home = () => {
    const { data} = useContext(MovieContext);

    return (
        <>
            <h1>Home</h1>
            {/* <button onClick={addRole}>Add Role</button> */}
        </>
    )
}