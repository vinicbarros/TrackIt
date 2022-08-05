import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import today from "../Utilities/setday";

import { getTodayHabits } from "../../services/TrackIt";
import LoginContext from "../Context/LoginContext";
import Navbar from "../Utilities/Navbar";
import Footer from "../Utilities/Footer";
import TodayHabit from "./TodayHabit";
import UserContext from "../Context/UserContext";

export default function Today() {
  const [todayHabits, setTodayHabits] = useState([]);
  const { token } = useContext(LoginContext);
  const { refresh, setRefresh } = useContext(UserContext);

  useEffect(() => {
    getTodayHabits(token)
      .then((response) => setTodayHabits(response.data))
      .catch((error) => console.log(error));
  }, [token, refresh]);

  return (
    <>
      <Navbar />
      <TodayContent>
        <Wrapper>
          <h1>{today}</h1>
          <h3>Nenhum hábito concluído ainda</h3>
        </Wrapper>
        <HabitsCheckBox>
          {todayHabits.map((habit, index) => (
            <TodayHabit key={index} todayHabits={habit} setRefresh={setRefresh} refresh={refresh}/>
          ))}
        </HabitsCheckBox>
      </TodayContent>
      <Footer />
    </>
  );
}

const TodayContent = styled.section`
  padding-top: 70px;
  min-height: 100vh;
  background: #f2f2f2;
  display: flex;
  align-items: center;
  flex-direction: column;

  h1 {
    margin: 28px 0px 6px 0px;
    font-weight: 400;
    font-size: 23px;
    color: #126ba5;
  }

  h3 {
    margin-bottom: 18px;
    color: #bababa;
    font-size: 18px;
    font-weight: 400;
  }
`;

const HabitsCheckBox = styled.main`
  width: 90%;
`;

const Wrapper = styled.span`
  width: 90%;
`;
