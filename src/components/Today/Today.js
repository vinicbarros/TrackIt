import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import { getTodayHabits } from "../../services/TrackIt";

import today from "../Utilities/setday";
import TodayHabit from "./TodayHabit";
import UserContext from "../Context/UserContext";

export default function Today() {
  const [todayHabits, setTodayHabits] = useState([]);
  const [ showScreen, setShowScreen ] = useState(false);
  const { refresh, setRefresh, percent, setPercent } = useContext(UserContext);

  useEffect(() => {
    getTodayHabits()
      .then((response) => {
        setTodayHabits(response.data);
        const done = response.data.filter((ths) => ths.done);
        const dayPercentage = Math.ceil(
          (done.length / response.data.length) * 100
          );
        if (isNaN(dayPercentage)) {
          setPercent(0);
        } else {
          setPercent(dayPercentage);
        }
        setShowScreen(true);
      })
      .catch((error) => alert("Ocorreu um erro ao ver os hábitos do dia!"));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh]);

  return (
    <>
      {!showScreen ? (
        <Load>
          <ThreeDots color="#00BFFF" height={80} width={80} />
        </Load>
      ) : (
        <TodayContent>
          <Wrapper>
            <h1>{today}</h1>
            {percent <= 0 ? (
              <h2>Nenhum hábito concluído ainda</h2>
            ) : (
              <h3>{percent.toFixed()}% dos hábitos concluídos</h3>
            )}
          </Wrapper>
          <HabitsCheckBox>
            {todayHabits.map((habit, index) => (
              <TodayHabit
                key={index}
                todayHabits={habit}
                setRefresh={setRefresh}
                refresh={refresh}
              />
            ))}
          </HabitsCheckBox>
        </TodayContent>
      )}
    </>
  );
}

const Load = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 98px;
  background: #f2f2f2;
`;

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

  h2 {
    margin-bottom: 18px;
    color: #bababa;
    font-size: 18px;
    font-weight: 400;
  }

  h3 {
    margin-bottom: 18px;
    color: #8fc549;
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
