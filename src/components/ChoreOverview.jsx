import styles from "./ChoreOverview.module.css";

function ChoreOverview({chore}) {
    return (
        <div className={styles.container + " clickable"}>
            {chore.name}
        </div>
    );
}

export default ChoreOverview;