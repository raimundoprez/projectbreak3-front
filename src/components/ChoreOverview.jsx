import {Link} from "react-router-dom";
import styles from "./ChoreOverview.module.css";

function ChoreOverview({chore}) {
    return (
        <Link to={`/tarea/${chore._id}`} className={styles.container}>
            {chore.name}
        </Link>
    );
}

export default ChoreOverview;