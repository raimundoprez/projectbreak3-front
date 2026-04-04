import {useState, useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";

import UserContext from "./UserContext.js";
import auth from "../config/firebase.js";

function UserProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // al montar por primera vez, comprobamos si el usuario tiene una sesión activa
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={{user, loading}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;