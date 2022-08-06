import { useContext } from "react";
import styled from "styled-components";
import { deleteHabit } from "../../services/TrackIt";
import UserContext from "../Context/UserContext";
import daysNumber from "../Utilities/daysNumber";

export default function Habit({ habit, daysSelected }) {
  const { setRefresh, refresh } = useContext(UserContext);

  function deleteHabits() {
    if (window.confirm("Você quer deletar este hábito?")) {
      deleteHabit(habit.id)
        .then((resp) => {
          console.log(resp);
          setRefresh(!refresh);
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <HabitBox>
      <h2>{habit.name}</h2>
      <Wrap>
        {daysNumber.map((day, key) =>
          daysSelected.includes(day.id) ? (
            <CheckedBox key={key}>
              {day.sigla}
            </CheckedBox>
          ) : (
            <UnCheckedBox key={key}>
              {day.sigla}
            </UnCheckedBox>
          )
        )}
      </Wrap>
      <ion-icon onClick={deleteHabits} name="trash-outline"></ion-icon>
    </HabitBox>
  );
}

const HabitBox = styled.section`
  position: relative;
  height: 91px;
  background-color: #ffffff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;

  h2 {
    margin: 13px 0px 8px 15px;
    color: #666666;
    font-size: 20px;
    font-weight: 400;
  }

  ion-icon {
    position: absolute;
    top: 15px;
    right: 15px;
    color: #666666;
  }
`;

const Wrap = styled.div`
  display: flex;
  margin-left: 15px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    font-size: 20px;
    font-weight: 400;
  }

  div + div {
    margin-left: 4px;
  }
`;

const CheckedBox = styled.div`
  color: #ffffff;
  background-color: #d4d4d4;
`;

const UnCheckedBox = styled.div`
  color: #dbdbdb;
  background-color: #ffffff;
`;