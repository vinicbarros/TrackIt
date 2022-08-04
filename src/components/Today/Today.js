import { useContext, useEffect } from "react";
import styled from "styled-components";
import { getTodayHabits } from "../../services/TrackIt";
import LoginContext from "../Context/LoginContext";
import Navbar from "../Utilities/Navbar";
import Footer from "../Utilities/Footer";

export default function Today() {
  const { token } = useContext(LoginContext);

  useEffect(() => {
    getTodayHabits(token)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  }, [token]);

  return (
    <>
      <Navbar />
      <TodayContent>vamos tentar novamente</TodayContent>
      <Footer />
    </>
  );
}

const TodayContent = styled.section`
    margin-top: 70px;
    min-height: 100vh;
    background: #f2f2f2;
`;
