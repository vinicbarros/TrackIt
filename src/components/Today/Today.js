import { useContext, useEffect } from "react";
import styled from "styled-components";
import today from "../Utilities/setday";

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
      <TodayContent>
        <h1>{today}</h1>
        <h3>Nenhum hábito concluído ainda</h3>
        <HabitsCheckBox>
            {}
        </HabitsCheckBox>
      </TodayContent>
      <Footer />
    </>
  );
}

const TodayContent = styled.section`
  padding-top: 70px;
  padding-left: 17px;
  min-height: 100vh;
  background: #f2f2f2;
  display: flex;
  flex-direction: column;

  h1 {
    margin: 28px 0px 6px 0px;
    font-weight: 400;   
    font-size: 23px;
    color: #126BA5;
  }

  h3 {
    color: #BABABA;
    font-size: 18px;
    font-weight: 400;
  }
`;

const HabitsCheckBox = styled.main`

`;
