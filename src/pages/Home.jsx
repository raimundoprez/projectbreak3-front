import {FaList} from "react-icons/fa6";
import styles from "../components/BigIconPanel.module.css";

function Home() {
    return (
        <div className={styles.container}>
            <span>Selecciona una categoría para acceder a tus tareas.</span>
            <FaList/>
        </div>
    );
}

export default Home;