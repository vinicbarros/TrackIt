// import { useState } from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Habits from "./Habits/Habits";
import LoginPage from "./Login/LoginPage";
import SignUpPage from "./SignUp/SignUpPage";
import GlobalStyle from "./style/GlobalStyle";

import UserContext from "./Context/UserContext";
import Today from "./Today/Today";
import Historic from "./Historic/Historic";
import PrivatePage from "./PrivatePage";

function App() {
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [percent, setPercent] = useState(0);

  return (
    <>
      <GlobalStyle />
      <UserContext.Provider
        value={{ user, setUser, refresh, setRefresh, percent, setPercent }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route
              path="/habitos"
              element={
                <PrivatePage>
                  <Habits />
                </PrivatePage>
              }
            />
            <Route
              path="/hoje"
              element={
                <PrivatePage>
                  <Today />
                </PrivatePage>
              }
            />
            <Route
              path="/historico"
              element={
                <PrivatePage>
                  <Historic />
                </PrivatePage>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
