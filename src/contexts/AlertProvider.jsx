import {useState} from "react";

import AlertContext from "./AlertContext.js";
import Popup from "../components/Popup.jsx";

function AlertProvider({children}) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return (
        <AlertContext.Provider value={{setOpen, setTitle, setContent}}>
            {children}
            <Popup open={open} setOpen={setOpen} title={title} content={content}/>
        </AlertContext.Provider>
    );
}

export default AlertProvider;