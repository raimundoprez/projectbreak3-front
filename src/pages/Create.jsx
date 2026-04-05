import {useContext} from "react";
import {useNavigate} from "react-router-dom";

import ChoreForm from "../components/ChoreForm.jsx";
import {create} from "../utils/request.js";
import UserContext from "../contexts/UserContext.js";
import AlertContext from "../contexts/AlertContext.js";
import styles from "./Create.module.css";

function Create({setChores}) {
    const {user} = useContext(UserContext);
    const {setOpen, setTitle, setContent} = useContext(AlertContext);

    const navigate = useNavigate();

    async function sendFunc(name, category, duration, startDate, endDate) {
        const body = {name, category, duration, startDate, endDate};

        const data = await create(user, body);

        if (!data) {
            setOpen(true);
            setTitle("Error");
            setContent("Fallo en la creación de la tarea");
        }
        else if (!data.response.ok) {
            setOpen(true);
            setTitle("Error");
            setContent("Fallo en la creación de la tarea: " + data.data.error);
        }
        else {
            setChores(prev => [...prev, data.data]);
            navigate("/todas");
        }
    }

    return (
        <div className={styles.container}>
            <h1>Crear una nueva tarea</h1>
            <ChoreForm submitFunc={sendFunc}/>
        </div>
    );
}

export default Create;