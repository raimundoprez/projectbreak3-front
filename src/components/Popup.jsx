import ReactPopup from "reactjs-popup";
import styles from "./Popup.module.css";

function Popup({open, setOpen, title, content, onClose = () => {}}) {
    function onCloseWrapper() {
        onClose();
        setOpen(false);
    }

    return (
        <ReactPopup open={open} onClose={onCloseWrapper} modal>
            <div className={styles.popup}>
                <h2>{title}</h2>
                {content}
                <button onClick={onCloseWrapper}>Cerrar</button>
            </div>
        </ReactPopup>
    );
}

export default Popup;