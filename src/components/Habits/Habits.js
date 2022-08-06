import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import { getHabits } from "../../services/TrackIt";

import UserContext from "../Context/UserContext";
import Habit from "./Habit";
import HabitsForm from "./HabitsForm";

export default function Habits() {
  const { refresh } = useContext(UserContext);
  const [userHabits, setUserHabits] = useState([]);
  const [createHabit, setCreateHabit] = useState(false);
  const [ showScreen, setShowScreen ] = useState(false);

  useEffect(() => {
    getHabits()
      .then((response) => setUserHabits(response.data))
      .catch((error) => console.log(error.response));
      setShowScreen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return (
    <>
      {!showScreen ? (
        <Load>
          <ThreeDots color="#00BFFF" height={80} width={80} />
        </Load>
      ) : (
        <ContentHabits>
          <span>
            <h3>Meus hábitos</h3>
            <button
              disabled={createHabit}
              onClick={() => {
                setCreateHabit(true);
              }}
            >
              +
            </button>
          </span>
          <HabitsForm create={createHabit} setCreateHabit={setCreateHabit} />
          <BoxHabits>
            {userHabits.length === 0 ? (
              <p>
                Você não tem nenhum hábito cadastrado ainda. Adicione um hábito
                para começar a trackear!
              </p>
            ) : (
              userHabits.map((habit, key) => (
                <Habit habit={habit} key={key} daysSelected={habit.days} />
              ))
            )}
          </BoxHabits>
        </ContentHabits>
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

const ContentHabits = styled.section`
  padding-top: 70px;
  min-height: 100vh;
  padding-bottom: 100px;
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 28px;
  }

  h3 {
    color: #126ba5;
    font-size: 22px;
    font-weight: 400;
  }

  button {
    background-color: #52b6ff;
    width: 40px;
    height: 35px;
    border: none;
    border-radius: 4.7px;
    color: #ffffff;
    font-size: 27px;
    font-weight: 400;
  }
`;

const BoxHabits = styled.section`
  width: 90%;
  margin-top: 28px;

  p {
    color: #666666;
    font-size: 18px;
    font-weight: 400;
  }

  section + section {
    margin-top: 10px;
  }
`;
