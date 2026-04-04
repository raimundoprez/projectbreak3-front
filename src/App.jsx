import {BrowserRouter} from "react-router-dom";

import Header from "./components/Header.jsx";
import UserProvider from "./contexts/UserProvider.jsx";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header/>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;