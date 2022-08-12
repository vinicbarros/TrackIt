import styled from "styled-components";
import Logo from "../../assets/img/Logo.svg";

import { Link, useNavigate } from "react-router-dom";
import { postSignUp } from "../../services/TrackIt";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function SignUpPage() {
  const [disabled, setDisabled] = useState(false);
  const [formValue, setFormValue] = useState({
    email: "",
    name: "",
    image: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleSignUp(e) {
    e.preventDefault();
    setDisabled(true);

    postSignUp(formValue)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        setDisabled(false);
        alert(`
      ${error.response.data.message} 
      Preencha os campos novamente!`);
      });
  }

  function handleInput(e) {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  }

  return (
    <Container>
      <img src={Logo} alt="Logo" />
      <form onSubmit={handleSignUp}>
        <input
          disabled={disabled}
          required
          name="email"
          value={formValue.email}
          type="email"
          placeholder="email"
          onChange={handleInput}
        />
        <input
          disabled={disabled}
          required
          name="password"
          value={formValue.password}
          type="password"
          placeholder="senha"
          onChange={handleInput}
        />
        <input
          disabled={disabled}
          required
          name="name"
          value={formValue.name}
          type="text"
          placeholder="nome"
          onChange={handleInput}
        />
        <input
          disabled={disabled}
          required
          name="image"
          value={formValue.image}
          type="url"
          placeholder="foto"
          onChange={handleInput}
        />
        <button disabled={disabled} type="submit">
          {!disabled ? (
            "Cadastrar"
          ) : (
            <ThreeDots color="#FFFFFF" height={80} width={80} />
          )}
        </button>
      </form>
      <Link to="/">Já tem uma conta? Faça login!</Link>
    </Container>
  );
}

const Container = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin-top: 68px;
    margin-bottom: 32px;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  input {
    padding-left: 10px;
    width: 289px;
    height: 45px;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    margin-bottom: 6px;
    font-size: 15px;
  }

  input::placeholder {
    color: #dbdbdb;
    font-size: 20px;
    font-weight: 400;
  }

  button {
    font-family: "Lexend Deca";
    border: none;
    background-color: #52b6ff;
    border-radius: 4.5px;
    width: 303px;
    height: 45px;
    color: #ffffff;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button[disabled] {
    opacity: 0.7;
  }

  a {
    color: #52b6ff;
    font-size: 14px;
    align-self: center;
    margin-top: 25px;
  }
`;
