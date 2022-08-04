import axios from "axios";

const BASE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";

function postSignUp(register) {
  const promise = axios.post(`${BASE_URL}/auth/sign-up`, register);
  return promise;
}

function postSignIn(login) {
  const promise = axios.post(`${BASE_URL}/auth/login`, login);
  return promise;
}

function postHabit(habit, auth) {
  const promise = axios.post(`${BASE_URL}/habits`, habit, {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  });
  return promise;
}

function getHabits(auth) {
  const promise = axios.get(`${BASE_URL}/habits`, {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  });
  return promise;
}

function deleteHabit(habitId, auth) {
  const promise = axios.delete(`${BASE_URL}/habits/${habitId}`, {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  });
  return promise;
}

function getTodayHabits(auth) {
  const promise = axios.get(`${BASE_URL}/habits/today`, {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  });
  return promise;
}

export { postSignUp, postSignIn, postHabit, getHabits, deleteHabit, getTodayHabits };
