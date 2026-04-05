import ChoreOverview from "./ChoreOverview.jsx";
import styles from "./ChoreCategory.module.css";

function ChoreCategory({title, chores}) {
    return (
        <div className={styles.container}>
            <h1>{title}</h1>

            <ul>
                {chores.map((chore, index) => {
                    return <li key={index}>
                        <ChoreOverview chore={chore}/>
                    </li>;
                })}
            </ul>
        </div>
    );
}

export default ChoreCategory;