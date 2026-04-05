import {BrowserRouter} from "react-router-dom";

import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import UserProvider from "./contexts/UserProvider.jsx";
import AlertProvider from "./contexts/AlertProvider.jsx";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.master}>
      <BrowserRouter>
        <UserProvider>
          <Header/>
          <AlertProvider>
            <Main/>
          </AlertProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;