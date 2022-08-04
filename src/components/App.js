// import { useState } from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Habits from "./Habits/Habits";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import GlobalStyle from "./style/GlobalStyle";

import UserContext from "./Context/UserContext";
import LoginContext from "./Context/LoginContext";
import Today from "./Today/Today";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={{ user, setUser, refresh, setRefresh }}>
        <LoginContext.Provider value={{ token, setToken }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/cadastro" element={<SignUpPage />} />
              <Route path="/habitos" element={<Habits />} />
              <Route path="/hoje" element={<Today />} />
            </Routes>
          </BrowserRouter>
        </LoginContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
