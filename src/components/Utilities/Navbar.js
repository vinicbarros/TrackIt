import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../Context/UserContext";

export default function Navbar() {

    const { user } = useContext(UserContext);
    console.log(user);

    return (
        <ContentHeader>
            <div>
                <h1>TrackIt</h1>
                <img src={user.image} alt="User"/>
            </div>
        </ContentHeader>
    );
}

const ContentHeader = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    font-family: 'Playball';
    width: 100vw;
    height: 70px;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`;