import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { getHabits } from "../../services/TrackIt";
import LoginContext from "../Context/LoginContext";
import UserContext from "../Context/UserContext";
import Footer from "../Utilities/Footer";
import Navbar from "../Utilities/Navbar";
import Habit from "./Habit";
import HabitsForm from "./HabitsForm";

export default function Habits() {
  const { token } = useContext(LoginContext);
  const { refresh } = useContext(UserContext);
  const [userHabits, setUserHabits] = useState([]);
  const [createHabit, setCreateHabit] = useState(false);

  useEffect(() => {
    getHabits(token)
      .then((response) => setUserHabits(response.data))
      .catch((error) => console.log(error.response));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return (
      <>
        <Navbar />
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
              userHabits.map( (habit, key) => (
                <Habit habit={habit} key={key} daysSelected={habit.days}/>
              ))
            )}
          </BoxHabits>
        </ContentHabits>
        <Footer />
      </>
  );
}

const ContentHabits = styled.section`
  padding-top: 70px;
  min-height: 100vh;
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
    color: #126BA5;
    font-size: 22px;
    font-weight: 400;
  }

  button {
    background-color: #52B6FF;
    width: 40px;
    height: 35px;
    border: none;
    border-radius: 4.7px;
    color: #FFFFFF;
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
