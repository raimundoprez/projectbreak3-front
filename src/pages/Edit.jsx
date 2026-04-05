import {useState, useEffect, useContext} from "react";
import {useParams, useNavigate} from "react-router-dom";

import ChoreForm from "../components/ChoreForm.jsx";
import {edit} from "../utils/request.js";
import UserContext from "../contexts/UserContext.js";
import AlertContext from "../contexts/AlertContext.js";
import styles from "./Edit.module.css";

function Edit({chores, setChores}) {
    const [chore, setChore] = useState(null);

    const {id} = useParams();

    const {user} = useContext(UserContext);
    const {setOpen, setTitle, setContent} = useContext(AlertContext);

    const navigate = useNavigate();

    useEffect(() => {
        const update = async () => {
            const choreFound = chores.find((chore) => chore._id === id);
            setChore(choreFound);
        };

        update();
    }, [chores, id]);

    async function sendFunc(name, category, duration, startDate, endDate) {
        const body = {name, category, duration, startDate, endDate};

        const data = await edit(user, id, body);

        if (!data) {
            setOpen(true);
            setTitle("Error");
            setContent("Fallo en la edición de la tarea");
        }
        else if (!data.response.ok) {
            setOpen(true);
            setTitle("Error");
            setContent("Fallo en la edición de la tarea: " + data.data.error);
        }
        else {
            const newChores = [...chores];
            const index = newChores.findIndex((newChore) => newChore._id === chore._id);

            if (index !== -1) {
                newChores[index] = data.data;
                setChores(newChores);
            }

            navigate("/tarea/" + id);
        }
    }

    return (
        <div className={styles.container}>
            <h1>Editar una tarea</h1>
            {chore && <ChoreForm chore={chore} submitFunc={sendFunc}/>}
        </div>
    );
}

export default Edit;