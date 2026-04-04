import {useState, useContext} from "react";
import {signOut} from "firebase/auth";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {FaUser} from "react-icons/fa";
import {MdLogin, MdLogout} from "react-icons/md";

import Popup from "./Popup.jsx";
import LoginForm from "./LoginForm.jsx";
import SignUpForm from "./SignUpForm.jsx";
import auth from "../config/firebase.js";
import UserContext from "../contexts/UserContext.js";
import styles from "./LoginHandler.module.css";

function LoginHandler() {
    const [loginOpen, setLoginOpen] = useState(false);
    const [signUpOpen, setSignUpOpen] = useState(false);
    const [logoutOpen, setLogoutOpen] = useState(false);

    const {user, loading} = useContext(UserContext);

    function renderLogin() {
        if (loading) {
            return (
                <div className={styles.panelWithIcon}>
                    <AiOutlineLoading3Quarters/>
                    <span>Cargando usuario</span>
                </div>
            );
        }
        else if (!user) {
            return (
                <div className={styles.loginCtn}>
                    <div onClick={() => setLoginOpen(true)} className={styles.panelWithIcon + " clickable"}>
                        <span>Login</span>
                        <MdLogin/>
                    </div>

                    <div onClick={() => setSignUpOpen(true)} className={styles.panelWithIcon + " clickable"}>
                        <span>Registrarse</span>
                        <MdLogin/>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className={styles.loginCtn}>
                    <div className={styles.panelWithIcon}>
                        <span>{user.email}</span>
                        <FaUser/>
                    </div>

                    <div onClick={logout} className={styles.panelWithIcon + " clickable"}>
                        <span>Cerrar sesión</span>
                        <MdLogout/>
                    </div>
                </div>
            );
        }
    }

    async function logout() {
        try {
            await signOut(auth);
        }
        catch(error) {
            console.error("Error de logout", error);
            setLogoutOpen(true);
        }
    }

    return (
        <>
            {renderLogin()}

            <LoginForm open={loginOpen} setOpen={setLoginOpen}/>
            <SignUpForm open={signUpOpen} setOpen={setSignUpOpen}/>

            <Popup
                open={logoutOpen}
                setOpen={setLogoutOpen}
                title="Cierre de sesión"
                content="Se ha producido un error durante el proceso de cierre de sesión."
            />
        </>
    );
}

export default LoginHandler;