import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import LoginContext from "../Context/LoginContext";
import { postHabit } from "../../services/TrackIt";
import WeekDay from "./WeekDay";
import UserContext from "../Context/UserContext";
import { ThreeDots } from "react-loader-spinner";

export default function HabitsForm({ setCreateHabit, create }) {
  const daysLetter = ["D", "S", "T", "Q", "Q", "S", "S"];
  const [disabled, setDisabled] = useState(false);
  const [days, setDays] = useState([]);
  const [habit, setHabit] = useState({
    name: "",
    days,
  });

  const { token } = useContext(LoginContext);
  const { setRefresh, refresh } = useContext(UserContext);

  useEffect(() => {
    setHabit({ ...habit, days });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  function sendHabit(e) {
    e.preventDefault();
    setDisabled(!disabled);

    postHabit(habit, token)
      .then((res) => {
        setDisabled(false);
        console.log(res.data);
        setRefresh(!refresh);
        setCreateHabit(false);
        setDays([]);
        setHabit({
          name: "",
          days,
        });
      })
      .catch((error) => {
        alert(
          "Campos inválidos, verifique se selecionou pelo menos um dia e colocou um nome para seu hábito!"
        );
        setDisabled(false);
      });
  }

  function handleInput(e) {
    setHabit({ ...habit, [e.target.name]: e.target.value });
  }

  return (
    <Content create={create}>
      <form onSubmit={sendHabit}>
        <input
          disabled={disabled}
          onChange={handleInput}
          name="name"
          value={habit.name}
          type="text"
          placeholder="nome do hábito"
        />
        <BoxDays>
          {daysLetter.map((day, index) => (
            <WeekDay
              days={days}
              setDays={setDays}
              key={index}
              dayNumber={index}
            >
              {day}
            </WeekDay>
          ))}
        </BoxDays>
        <Wrapper disabled={disabled}>
          <h5
            onClick={() => {
              setCreateHabit(false);
            }}
          >
            Cancelar
          </h5>
          <button disabled={disabled} type="submit">
            {!disabled ? (
              "Salvar"
            ) : (
              <ThreeDots color="#FFFFFF" height={40} width={40} />
            )}
          </button>
        </Wrapper>
      </form>
    </Content>
  );
}

const Content = styled.div`
  display: ${(props) => (props.create ? "visible" : "none")} !important;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 90%;
  background-color: #ffffff;
  margin-top: 20px;
  min-height: 180px;
  border-radius: 5px;

  input {
    margin: 18px 0px 8px 18px;
    font-size: 18px;
    padding-left: 11px;
    width: 303px;
    height: 45px;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
  }

  input::placeholder {
    color: #d4d4d4;
    font-size: 20px;
  }

  input:focus {
    outline: 0;
    box-shadow: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 15px;
  right: 16px;

  h5 {
    color: #52b6ff;
    font-weight: 400;
    font-size: 15.976px;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 23px;
    width: 84px !important;
    height: 35px;
    background-color: #52b6ff;
    border: none;
    border-radius: 5px;
    color: #ffffff;
    font-weight: 400;
    font-size: 15.976px !important;
    opacity: ${(props) => (props.disabled ? "0.7" : "1")};
  }
`;

const BoxDays = styled.section`
  display: flex;
  margin-left: 18px;

  div + div {
    margin-left: 4px;
  }
`;
