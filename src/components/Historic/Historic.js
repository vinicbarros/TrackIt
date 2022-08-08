import { useEffect, useState } from "react";
import styled from "styled-components";

import Calendar from "react-calendar";
import dayjs from "dayjs";
import "react-calendar/dist/Calendar.css";
import { getDailyHabits } from "../../services/TrackIt";
import HabitHistoric from "./HabitHistoric";

export default function Historic() {
  const [dailyHabits, setDailyHabits] = useState([]);
  const [days, setDays] = useState([]);
  const [disable, setDisable] = useState(false);
  const [numDay, setNumDay] = useState(undefined);

  useEffect(() => {
    getDailyHabits()
      .then((response) => {
        setDailyHabits(response.data);
        setDays(response.data.map((d) => d.day));
      })
      .catch(() => alert("Ocorreu um erro ao ver o histórico!"));
  }, []);

  function showTiles({ date }) {
    const thisDay = dayjs().format("DD/MM/YYYYY");
    const dates = dayjs(date).format("DD/MM/YYYY");

    if (days.includes(dates) && dates !== thisDay) {
      const habits = dailyHabits[days.indexOf(dates)].habits;
      if (habits.some((h) => h.done === false)) {
        return "undone";
      } else {
        return "done";
      }
    }
  }

  function selectHabitsDay(day) {
    const thisDay = dayjs(day).format("DD/MM/YYYY");
    if (days.includes(thisDay)) {
      setNumDay(days.indexOf(thisDay));
      setDisable(true);
    }
  }

  return (
    <>
      <Content>
        <h1>Histórico</h1>
        <Wrapper>
          <Calendar
            calendarType="US"
            formatShortWeekday={(locale, date) =>
              ["Dom", "Seg", "Ter", "Quar", "Qui", "Sex", "Sab"][date.getDay()]
            }
            tileClassName={showTiles}
            onClickDay={selectHabitsDay}
          />
        </Wrapper>
        <Box>
          {disable ? (
            <>
              <h2>{dailyHabits[numDay].day}</h2>
              <div>
                {dailyHabits[numDay].habits.map((h, i) => (
                  <HabitHistoric key={i} name={h.name} done={h.done} />
                ))}
              </div>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Content>
    </>
  );
}

const Content = styled.section`
  min-height: 100vh;
  padding-top: 98px;
  padding-bottom: 100px;
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    width: 90%;
    color: #126ba5;
    font-size: 22px;
    font-weight: 400;
    margin-bottom: 20px;
  }
`;

const Wrapper = styled.div`
  font-family: Montserrat, "Segoe UI", Tahoma, sans-serif;
  display: flex;
  justify-content: center;

  .react-calendar {
    width: 400px;
    height: 402px;
    max-width: 90%;
    background-color: #fff;
    color: #222;
    border-radius: 10px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
    border: none;
  }

  button {
    font-family: "Lexend Deca";
    font-weight: 400;
  }

  .react-calendar__tile {
    margin-top: 23px !important;
  }

  .done {
    clip-path: circle(33%);
    background-color: #8cc654;
  }

  .undone {
    clip-path: circle(33%);
    background-color: #f56e7c;
  }
`;

const Box = styled.main`
  margin-top: 50px;
  width: 90%;

  h2 {
    font-size: 20px;
    color: #126ba5;
  }

  section + section {
    margin-top: 12px;
  }
`;
