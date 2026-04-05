import {useState, useEffect, useContext} from "react";
import {Routes, Route} from "react-router-dom";

import Home from "../pages/Home.jsx";
import Edit from "../pages/Edit.jsx";
import Create from "../pages/Create.jsx";
import NoSession from "./NoSession.jsx";
import ChoreCategory from "./ChoreCategory.jsx";
import ChoreDetail from "./ChoreDetail.jsx";
import UserContext from "../contexts/UserContext.js";
import AlertContext from "../contexts/AlertContext.js";

import {getAll} from "../utils/request.js";
import styles from "./Main.module.css";

function Main() {
    const [chores, setChores] = useState([]);

    const {user} = useContext(UserContext);
    const {setOpen, setTitle, setContent} = useContext(AlertContext);

    // cargamos las tareas la primera vez que se monta el componente y cuando cambia el usuario logueado
    useEffect(() => {
        const updateChores = async () => {
            if (!user) {
                setChores([]);
            }
            else {
                const data = await getAll(user);

                if (!data) {
                    setOpen(true);
                    setTitle("Error");
                    setContent("Se ha producido un error al obtener tus tareas. Prueba a recargar la página.");
                }
                else {
                    if (!data.response.ok) {
                        setOpen(true);
                        setTitle("Error");
                        setContent("Se ha producido un error al obtener tus tareas. Prueba a recargar la página: " + data.data.error);
                    }
                    else {
                        setChores(data.data);
                    }
                }
            }
        };

        updateChores();
    }, [user, setOpen, setTitle, setContent]);

    return (
        <main className={styles.main}>
            {
                user
                ?
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/todas" element={<ChoreCategory title="Todas tus tareas" chores={chores}/>}/>
                        <Route path="/hogar" element={<ChoreCategory title="Hogar" chores={chores.filter((chore) => chore.category === "Hogar")}/>}/>
                        <Route path="/salud" element={<ChoreCategory title="Salud" chores={chores.filter((chore) => chore.category === "Salud")}/>}/>
                        <Route path="/trabajo" element={<ChoreCategory title="Trabajo" chores={chores.filter((chore) => chore.category === "Trabajo")}/>}/>
                        <Route path="/estudio" element={<ChoreCategory title="Estudio" chores={chores.filter((chore) => chore.category === "Estudio")}/>}/>
                        <Route path="/otro" element={<ChoreCategory title="Otro" chores={chores.filter((chore) => chore.category === "Otro")}/>}/>
                        <Route path="/tarea/:id" element={<ChoreDetail chores={chores} setChores={setChores}/>}/>
                        <Route path="/tarea/:id/editar" element={<Edit chores={chores} setChores={setChores}/>}/>
                        <Route path="/crear" element={<Create setChores={setChores}/>}/>
                    </Routes>
                :
                    <NoSession/>
            }
        </main>
    );
}

export default Main;