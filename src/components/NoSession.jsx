import {FaUserSlash} from "react-icons/fa";
import styles from "./BigIconPanel.module.css";

function NoSession() {
    return (
        <div className={styles.container}>
            <span>Inicia sesión para ver tus tareas.</span>
            <FaUserSlash/>
        </div>
    );
}

export default NoSession;