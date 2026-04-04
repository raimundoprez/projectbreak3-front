import {useRef, useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";

import Popup from "./Popup.jsx";
import auth from "../config/firebase.js";
import styles from "./LoginForm.module.css";

function SignUpForm({open, setOpen}) {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        emailRef.current.value = "";
        passwordRef.current.value = "";

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setErrorMessage("");
            setOpen(false);
        }
        catch(error) {
            console.error("Error creando un usuario", error);
            setErrorMessage(error.message);
        }
    }

    return (
        <Popup open={open} setOpen={setOpen} title={"Crear cuenta"} onClose={() => setErrorMessage("")} content={
            <div className={styles.formsCtn}>
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Correo electrónico:</span>
                        <input ref={emailRef} type="email" placeholder="Tu correo electrónico" required/>
                    </label>

                    <label>
                        <span>Contraseña:</span>
                        <input ref={passwordRef} type="password" placeholder="Tu contraseña" required/>
                    </label>

                    <button type="submit">Enviar</button>
                </form>

                <span className={styles.errorMessage + (errorMessage.length ? "" : " hidden")}>{errorMessage}</span>
            </div>
        }/>
    );
}

export default SignUpForm;