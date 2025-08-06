import { NavLink } from 'react-router'

import styles from './navigation.module.css'
export const Navigation = () => {
    return (
        <nav>
            <div className={styles.logoContainer}>
                <span>Movie</span>
                <span>Casting</span>
            </div>
            <ul className={styles.navItemsContainer}>
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? `${styles.active}` : ""}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/movies"
                        className={({ isActive }) => isActive ? `${styles.active}` : ""}
                    >
                        Movies
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/actors"
                        className={({ isActive }) => isActive ? `${styles.active}` : ""}
                    >
                        Actors
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}