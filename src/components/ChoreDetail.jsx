import {useState, useEffect, useContext} from "react";
import {useParams} from "react-router-dom";
import {Calendar} from "react-multi-date-picker";
import DateObject from "react-date-object";

const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

import UserContext from "../contexts/UserContext.js";
import AlertContext from "../contexts/AlertContext.js";
import {addCompletedDay, removeCompletedDay} from "../utils/request.js";
import styles from "./ChoreDetail.module.css";

function ChoreDetail({chores, setChores}) {
    const [chore, setChore] = useState(null);
    const [selectDates, setSelectDates] = useState([]);

    const {id} = useParams();

    const {user} = useContext(UserContext);
    const {setOpen, setTitle, setContent} = useContext(AlertContext);

    useEffect(() => {
        const update = async () => {
            const choreFound = chores.find((chore) => chore._id === id);

            setChore(choreFound);
            setSelectDates(choreFound ? [...choreFound.completedDays] : []);
        };

        update();
    }, [chores, id]);

    function renderDetail() {
        const startDate = new Date(chore.startDate);
        const endDate = new Date(chore.endDate);
        const startDateLS = startDate.toLocaleDateString("es-ES");
        const endDateLS = endDate.toLocaleDateString("es-ES");
        const startDateDO = new DateObject(startDate);

        return (
            <>
                <div className={styles.details}>
                    <span>
                        <span>Nombre</span>
                        <span>{chore.name}</span>
                    </span>

                    <span>
                        <span>Categoría</span>
                        <span>{chore.category}</span>
                    </span>

                    <span>
                        <span>Duración</span>
                        <span>{chore.duration} min</span>
                    </span>

                    <span>
                        <span>Fecha de inicio</span>
                        <span>{startDateLS}</span>
                    </span>

                    <span>
                        <span>Fecha de fin</span>
                        <span>{endDateLS}</span>
                    </span>
                </div>

                <p>Días completados</p>

                <Calendar
                    value={selectDates}
                    weekDays={weekDays}
                    months={months}
                    currentDate={startDateDO}
                    minDate={startDate}
                    maxDate={endDate}
                    onChange={updateCompletedDays}
                />
            </>
        );
    }

    // callback de Calendar que nos da un array con la selección actual
    // completedDays es un array de DateObject que hay que pasar a Date
    async function updateCompletedDays(dateObjects) {
        const dates = dateObjects.map((dateObject) => dateObject.toDate());
        const refDates = chore.completedDays.map((cd) => new Date(cd));

        // si se acaba de añadir una fecha, la obtenemos aquí
        const added = dates.filter((date) => !refDates.some((refDate) => refDate.getTime() === date.getTime()));
        
        // si se acaba de eliminar una fecha, la obtenemos aquí
        const removed = refDates.filter((refDate) => !dates.some((date) => date.getTime() === refDate.getTime()));

        if (added.length || removed.length) {
            const func = added.length ? addCompletedDay : removeCompletedDay;
            const toSend = added.length ? added[0] : removed[0];
            const errorText = added.length ? "añadir" : "borrar";

            const data = await func(user, chore._id, toSend);

            if (!data) {
                setOpen(true);
                setTitle("Error");
                setContent("Fallo al " + errorText + " el día");

                setSelectDates([...chore.completedDays]);
            }
            else if (!data.response.ok) {
                setOpen(true);
                setTitle("Error");
                setContent("Fallo al " + errorText + " el día: " + data.data.error);

                setSelectDates([...chore.completedDays]);
            }
            else {
                const newChores = [...chores];
                const toFind = newChores.find((newChore) => newChore === chore);

                if (toFind) {
                    toFind.completedDays = data.data;

                    setChores(newChores);
                    setSelectDates([...data.data]);
                }
                else {
                    setSelectDates([...chore.completedDays]);
                }
            }
        }
    }

    return (
        <div className={styles.container}>
            <h1>Detalles de la tarea</h1>
            {chore && renderDetail()}
        </div>
    );
}

export default ChoreDetail;