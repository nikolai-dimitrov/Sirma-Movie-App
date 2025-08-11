import { FaGithub } from 'react-icons/fa6'

import styles from './footer.module.css'

export const Footer = () => {
    return (
        <div className={styles.footerContent}>
            <p className={styles.heading}>Sirma Exam 2025</p>
            <a className={styles.gitHub} href="https://github.com/nikolai-dimitrov/Sirma-Movie-App">
                <p>GitHub</p>
                <FaGithub />
            </a>
        </div>
    )
}