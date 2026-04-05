import {useRef} from "react";

const categories = ["Hogar", "Salud", "Trabajo", "Estudio", "Otro"];
const maxRange = 30;

function ChoreForm({chore, submitFunc}) {
    const nameRef = useRef(null);
    const categoryRef = useRef(null);
    const durationRef = useRef(null);
    const startDateRef = useRef(null);
    const endDateRef = useRef(null);

    async function handleSubmit(event) {
        event.preventDefault();

        await submitFunc(
            nameRef.current.value,
            categoryRef.current.value,
            durationRef.current.value,
            startDateRef.current.value,
            endDateRef.current.value
        );
    }

    function validateDates() {
        const startVal = startDateRef.current.value;
        const endVal = endDateRef.current.value;

        if (!startVal || !endVal) {
            endDateRef.current.setCustomValidity("");
            return;
        }

        const start = new Date(startVal);
        const end = new Date(endVal);

        if (end < start) {
            endDateRef.current.setCustomValidity("La fecha final debe ser mayor o igual que la inicial");
        }
        else if ((end - start) / (1000 * 60 * 60 * 24) > maxRange) {
            endDateRef.current.setCustomValidity(`La fecha final no puede exceder ${maxRange} días desde la inicial`);
        }
        else {
            endDateRef.current.setCustomValidity("");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <span>Nombre:</span>
                <input ref={nameRef} type="text" defaultValue={chore?.name} maxLength="100" placeholder="Nombre de la tarea" required/>
            </label>

            <label>
                <span>Categoría:</span>
                <select ref={categoryRef} defaultValue={chore?.category} required>
                    {categories.map((category, index) => <option key={index} value={category}>{category}</option>)}
                </select>
            </label>

            <label>
                <span>Duración:</span>
                <input ref={durationRef} type="number" defaultValue={chore?.duration} step="1" min="1" max="720" placeholder="Duración en minutos" required/>
            </label>

            <label>
                <span>Fecha de inicio:</span>
                <input ref={startDateRef} type="date" defaultValue={chore?.startDate.split("T")[0]} onChange={validateDates} required/>
            </label>

            <label>
                <span>Fecha de fin:</span>
                <input ref={endDateRef} type="date" defaultValue={chore?.endDate.split("T")[0]} onChange={validateDates} required/>
            </label>

            <button type="submit">Enviar</button>
        </form>
    );
}

export default ChoreForm;