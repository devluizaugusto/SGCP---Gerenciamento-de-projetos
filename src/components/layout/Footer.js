import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

import styles from './Footer.module.css';
function Footer() {
    return (
        <footer className={styles.footer}>
            <p>Visite nossas redes socias</p>
            <ul className={styles.socialList}>
                <li>
                    <Link to="https://www.facebook.com" target="_blank">
                        <FaFacebook />
                    </Link>
                </li>
                <li>
                    <Link to="https://www.instagram.com" target="blank">
                        <FaInstagram />
                    </Link>
                </li>
                <li>
                <Link to="https://www.linkedin.com" target="blank">
                        <FaLinkedin />
                    </Link>
                </li>
            </ul>
            <p className={styles.copyRight}>
                <span>SGCP - Sistema de Gerênciamento de custos em Projetos</span> &copy; 2024
            </p>
        </footer>
    );
}

export default Footer;