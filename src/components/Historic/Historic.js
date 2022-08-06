import { useEffect, useState } from "react";
import styled from "styled-components";

import Calendar from "react-calendar";
import dayjs from "dayjs";
import "react-calendar/dist/Calendar.css";
import { getTodayHabits } from "../../services/TrackIt";

export default function Historic() {
  //const [value, onChange] = useState(new Date());
  const [dailyHabits, setDailyHabits] = useState([]);
  const [days, setDays] = useState([]);
  console.log(dailyHabits);

  useEffect(() => {
    getTodayHabits().then((response) => {
      setDailyHabits(response);
    });
  }, []);

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
          />
        </Wrapper>
      </Content>
    </>
  );
}

const Content = styled.section`
  height: 100vh;
  padding-top: 98px;
  background: #f2f2f2;

  h1 {
    margin-left: 18px;
    width: 90%;
    color: #126ba5;
    font-size: 22px;
    font-weight: 400;
    margin-bottom: 11px;
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
`;
