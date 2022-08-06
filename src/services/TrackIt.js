import axios from "axios";

const BASE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";

function createHeaders() {
  const auth = JSON.parse(localStorage.getItem("trackit"));
  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };

  return config;
}

function postSignUp(register) {
  const promise = axios.post(`${BASE_URL}/auth/sign-up`, register);
  return promise;
}

function postSignIn(login) {
  const promise = axios.post(`${BASE_URL}/auth/login`, login);
  return promise;
}

function postHabit(habit) {
  const config = createHeaders();
  const promise = axios.post(`${BASE_URL}/habits`, habit, config);
  return promise;
}

function getHabits(auth) {
  const config = createHeaders();
  const promise = axios.get(`${BASE_URL}/habits`, config);
  return promise;
}

function deleteHabit(habitId) {
  const config = createHeaders();
  const promise = axios.delete(`${BASE_URL}/habits/${habitId}`, config);
  return promise;
}

function getTodayHabits() {
  const config = createHeaders();
  const promise = axios.get(`${BASE_URL}/habits/today`, config);
  return promise;
}

function checkDoneHabit(habitId) {
  const config = createHeaders();
  const promise = axios.post(
    `${BASE_URL}/habits/${habitId}/check`, 
    {}, 
    config
    );
  return promise;
}

function uncheckDoneHabit(habitId) {
  const config = createHeaders();
  const promise = axios.post(
    `${BASE_URL}/habits/${habitId}/uncheck`,
    {},
    config
  );
  return promise;
}

function getDailyHabits() {
  const config = createHeaders();
  const promise = axios.get(`${BASE_URL}/habits/history/daily`, config);
  return promise;
}

export {
  postSignUp,
  postSignIn,
  postHabit,
  getHabits,
  deleteHabit,
  getTodayHabits,
  checkDoneHabit,
  uncheckDoneHabit,
  getDailyHabits
};
