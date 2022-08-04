import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import UserContext from "../Context/UserContext";

export default function WeekDay({ children, days, setDays, dayNumber }) {
  const [isSelected, setIsSelected] = useState(false);
  const { refresh } = useContext(UserContext);

  useEffect( () => {
    setIsSelected(false);
  }, [refresh]);

  switch (isSelected) {
    case false:
      return (
        <DayContent
          selected={isSelected}
          onClick={() => {
            setIsSelected(!isSelected);
            setDays([...days, dayNumber]);
          }}
        >
          {children}
        </DayContent>
      );
    case true:
      return (
        <DayContent
          selected={isSelected}
          onClick={() => {
            setIsSelected(!isSelected);
            setDays((ths) => ths.filter((days) => days !== dayNumber));
          }}
        >
          {children}
        </DayContent>
      );
    default:
      return null;
  }
}

const DayContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 400;
  color: ${(props) => (props.selected ? "#FFFFFF" : "#DBDBDB")};
  background-color: ${(props) => (props.selected ? "#CFCFCF" : "#FFFFFF")};
`;
