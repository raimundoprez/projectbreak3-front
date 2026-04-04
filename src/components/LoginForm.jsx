import {useRef, useState} from "react";
import {signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";

import Popup from "./Popup.jsx";
import auth from "../config/firebase.js";
import styles from "./LoginForm.module.css";

function LoginForm({open, setOpen}) {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const recoveryRef = useRef(null);

    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        emailRef.current.value = "";
        passwordRef.current.value = "";

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setErrorMessage("");
            setOpen(false);
        }
        catch(error) {
            console.error("Error en un login", error);
            setErrorMessage(error.message);
        }
    }

    async function handleRecovery(event) {
        event.preventDefault();

        const recoveryEmail = recoveryRef.current.value;

        recoveryRef.current.value = "";

        try {
            await sendPasswordResetEmail(auth, recoveryEmail);
            setErrorMessage("");
            setOpen(false);
        }
        catch(error) {
            console.error("Error enviando un email de recuperación", error);
            setErrorMessage(error.message);
        }
    }

    return (
        <Popup open={open} setOpen={setOpen} title={"Login"} onClose={() => setErrorMessage("")} content={
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

                <form onSubmit={handleRecovery}>
                    <label>
                        <span>Contraseña olvidada:</span>
                        <input ref={recoveryRef} type="email" placeholder="Tu correo de recuperación" required/>
                    </label>

                    <button type="submit">Restablecer contraseña</button>
                </form>

                <span className={styles.errorMessage + (errorMessage.length ? "" : " hidden")}>{errorMessage}</span>
            </div>
        }/>
    );
}

export default LoginForm;