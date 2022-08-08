import styled from "styled-components";
import checkImg from "../../assets/img/Group.svg";

export default function HabitHistoric({ name, done }) {
  return (
    <Content>
      <h3>{name}</h3>
      <CheckBox check={done}>
        <img src={checkImg} alt="check" />
      </CheckBox>
    </Content>
  );
}

const Content = styled.section`
  margin-top: 20px;
  height: 91px;
  background: #ffffff;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;

  h3 {
    margin-left: 15px;
  }
`;

const CheckBox = styled.div`
  width: 69px;
  height: 69px;
  margin: 0px 15px 0px 0px;
  border-radius: 5px;
  background: ${(props) => (props.check ? "#8FC549" : "#f56e7c")};
  border: 1px solid #e7e7e7;
  display: flex;
  align-items: center;
  justify-content: center;
`;
