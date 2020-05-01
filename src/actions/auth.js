const domain = "http://localhost:8000";
const url = domain;
const jsonHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const REGISTER = "REGISTER";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGOUT = "LOGOUT"


export const login = (loginData) => (dispatch) => {
  dispatch({
    type: LOGIN,
  });
  fetch(url + "/api-token-auth/", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(loginData),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.json().then((result) => {
        throw result;
      });
    })
    .then((result) => {
      return dispatch({
        type: LOGIN_SUCCESS,
        payload: { ...result, username: loginData.username },
      });
    })
    .catch((err) => {
      return Promise.reject(
        dispatch({ type: LOGIN_FAIL, payload: JSON.stringify(err) })
      );
    });
};

export const register = (registerData) => (dispatch) => {
  dispatch({
    type: REGISTER,
  });

  return fetch(url + "/users/", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(registerData),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.json().then((result) => {
        throw result;
      });
    })
    .then((result) => {
      return dispatch({
        type: REGISTER_SUCCESS,
        payload: result,
      });
    })
    .catch((err) => {
      return Promise.reject(
        dispatch({ type: REGISTER_FAIL, payload: JSON.stringify(err) })
      );
    });
};

export const logout = () => {
  return {type:LOGOUT}
}
