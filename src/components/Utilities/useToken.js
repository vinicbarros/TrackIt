import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function useToken() {
    const navigate = useNavigate();
    const [token, setToken] = useState({});

    useEffect( () => {
        const auth = JSON.parse(localStorage.getItem("trackit"));

        if (!auth) {
            navigate("/");
        }

        setToken(auth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [token];
}

export { useToken };