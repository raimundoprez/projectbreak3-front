import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

// asumimos que el JSON viene bien formateado del .env
const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);

// inicializar Firebase
const app = initializeApp(firebaseConfig);

// obtener auth
const auth = getAuth(app);

export default auth;