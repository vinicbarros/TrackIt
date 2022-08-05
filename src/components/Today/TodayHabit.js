import { useContext } from "react";
import styled from "styled-components";
import checkImg from "../../assets/img/Group.svg";
import { checkDoneHabit, uncheckDoneHabit } from "../../services/TrackIt";
import LoginContext from "../Context/LoginContext";

export default function TodayHabit({ todayHabits, setRefresh, refresh }) {
  const done = todayHabits.done;
  const { token } = useContext(LoginContext);
  
  function check() {
    checkDoneHabit(todayHabits.id, token)
      .then((response) => {
        setRefresh(!refresh);
      })
      .catch((error) => console.log(error));
  }

  function unCheck() {
    uncheckDoneHabit(todayHabits.id, token)
    .then((response) => {
        setRefresh(!refresh);
      })
      .catch((error) => console.log(error));
  }

  return (
    <HabitContent>
      <Wrapper>
        <h2>{todayHabits.name}</h2>
        <p>Sequência atual: {todayHabits.currentSequence} dias</p>
        <p>Seu recorde: {todayHabits.highestSequence} dias</p>
      </Wrapper>
      {done ? (
        <CheckBox onClick={unCheck} check={done}>
          <img src={checkImg} alt="check" />
        </CheckBox>
      ) : (
        <CheckBox onClick={check} check={done}>
          <img src={checkImg} alt="unCheck" />
        </CheckBox>
      )}
    </HabitContent>
  );
}

const HabitContent = styled.div`
  margin-top: 10px;
  height: 94px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
`;

const Wrapper = styled.div`
  h2 {
    margin: 0px 0px 7px 15px;
    color: #666666;
    font-size: 20px;
    font-weight: 400;
  }

  p {
    margin: 6px 0px 0px 15px;
    color: #666666;
    font-size: 13px;
    font-weight: 400;
  }
`;

const CheckBox = styled.div`
  width: 69px;
  height: 69px;
  margin: 0px 15px 0px 0px;
  border-radius: 5px;
  background: ${(props) => (props.check ? "#8FC549" : "#EBEBEB")};
  border: 1px solid #e7e7e7;
  display: flex;
  align-items: center;
  justify-content: center;
`;
