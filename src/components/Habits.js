import { useContext, useEffect } from "react";
import { getHabits } from "../services/TrackIt";
import LoginContext from "./Context/LoginContext";

export default function Habits() {
  const { token } = useContext(LoginContext);

  useEffect( () => {
    getHabits({
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then( (response) => console.log(response.data))
    .catch( (error) => console.log(error.response));
  }, []);

  return (
    <div>
      <Habits />
      TO na tela de habitos
    </div>
  );
}
