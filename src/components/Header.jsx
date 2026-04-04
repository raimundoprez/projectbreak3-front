import {useState} from "react";
import {Link} from "react-router-dom";
import {MdAddTask} from "react-icons/md";
import {GiHamburgerMenu} from "react-icons/gi";

import LoginHandler from "./LoginHandler.jsx";
import styles from "./Header.module.css";

function Header() {
    const [burgerOpen, setBurgerOpen] = useState(false);

    return (
        <header className={styles.header}>
            <GiHamburgerMenu onClick={() => setBurgerOpen(!burgerOpen)} className={styles.burger + " clickable"}/>

            <Link to="/" className={styles.titleCtn}>
                <MdAddTask/>
                <span>Gestor de tareas</span>
            </Link>

            <div className={styles.mainMenu + " " + (burgerOpen ? styles.open : "")}>
                <nav className={styles.nav}>
                    <Link to="/todas">Todas</Link>
                    <Link to="/hogar">Hogar</Link>
                    <Link to="/salud">Salud</Link>
                    <Link to="/trabajo">Trabajo</Link>
                    <Link to="/estudio">Estudio</Link>
                    <Link to="/otro">Otro</Link>
                    <Link to="/crear">Crear</Link>
                </nav>

                <LoginHandler/>
            </div>
        </header>
    );
}

export default Header;