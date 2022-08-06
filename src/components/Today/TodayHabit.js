import { useState } from "react";
import styled from "styled-components";
import { Grid } from "react-loader-spinner";
import checkImg from "../../assets/img/Group.svg";
import { checkDoneHabit, uncheckDoneHabit } from "../../services/TrackIt";

export default function TodayHabit({ todayHabits, setRefresh, refresh }) {
  const done = todayHabits.done;
  const isHigh = (todayHabits.currentSequence >= todayHabits.highestSequence);
  const [disable, setDisable] = useState(false);

  function check() {
    setDisable(true);
    checkDoneHabit(todayHabits.id)
      .then((response) => {
        setRefresh(!refresh);
        setDisable(false);
      })
      .catch((error) => console.log(error));
  }

  function unCheck() {
    setDisable(true);
    uncheckDoneHabit(todayHabits.id)
      .then((response) => {
        setRefresh(!refresh);
        setDisable(false);
      })
      .catch((error) => console.log(error));
  }

  return (
    <HabitContent done={done}>
      <Wrapper>
        <h2>{todayHabits.name}</h2>
        <p>
          Sequência atual:{" "}
          <HighText done={done}>{todayHabits.currentSequence} dias </HighText>
        </p>
        <p>
          Seu recorde: <HighScore isHigh={isHigh} done={done}> {todayHabits.highestSequence} dias</HighScore>
        </p>
      </Wrapper>
      {done ? (
        <CheckBox onClick={unCheck} check={done}>
          {disable ? (
            <Grid color="#FFFFFF" height={30} width={30} />
          ) : (
            <img src={checkImg} alt="check" />
          )}
        </CheckBox>
      ) : (
        <CheckBox onClick={check} check={done}>
          {disable ? (
            <Grid color="#8FC549" height={30} width={30} />
          ) : (
            <img src={checkImg} alt="unCheck" />
          )}
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
    font-weight: 500;
  }

  p {
    margin: 6px 0px 0px 15px;
    color: #666666;
    font-size: 13px;
    font-weight: 400;
  }
`;

const HighText = styled.strong`
  color: ${(props) => (props.done ? "#8fc549" : "#666666")};
`;

const HighScore = styled.strong`
  color: ${(props) => (props.isHigh && props.done ? "#8fc549" : "#666666")};
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
