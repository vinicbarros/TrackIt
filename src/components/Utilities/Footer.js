import { useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";

import styled from "styled-components";
import UserContext from "../Context/UserContext";

export default function Footer() {
  const { percent } = useContext(UserContext);

  return (
    <FooterContent>
      <Link to="/habitos">Hábitos</Link>
      <Link to="/hoje">
        <WrapCircle>
          <CircularProgressbar
            value={percent}
            text={`Hoje`}
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: "#3e98c7",
              textColor: "#fff",
              pathColor: "#fff",
              trailColor: "transparent",
            })}
          />
        </WrapCircle>
      </Link>
      <Link to="/historico">Histórico</Link>
    </FooterContent>
  );
}

const FooterContent = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 70px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-around;

  a {
    text-decoration: none;
    color: #52B6FF;
    font-size: 18px;
    font-weight: 400;
  }
`;

const WrapCircle = styled.div`
  width: 91px;
  height: 91px;
  position: absolute;
  bottom: 15px;
  left: calc(50% - 45.5px);
`;
