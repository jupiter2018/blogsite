const domain = "http://localhost:8000";
const jsonHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
export const GET_ALL_USER = "GET_ANY_USER";
export const GET_ALL_USER_SUCCESS = "GET_ANY_USER_SUCCESS";
export const GET_ALL_USER_FAILURE = "GET_ANY_USER_FAILURE";
export const UPDATE_USER = "UPDATE_USER"
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS"
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE"
export const GET_OWN_DATA = "GET_OWN_DATA"
export const GET_OWN_DATA_SUCCESS = 'GET_OWN_DATA_SUCCESS'
export const GET_OWN_DATA_FAILURE = 'GET_OWN_DATA_FAILURE'
export const UPDATE_USER_PASSWORD = 'UPDATE_USER_PASSWORD'
export const UPDATE_USER_PASSWORD_SUCCESS = 'UPDATE_USER_PASSWORD_SUCCESS'
export const UPDATE_USER_PASSWORD_FAILURE = 'UPDATE_USER_PASSWORD_FAILURE'
export const CLOSE_CLICK = 'CLOSE_CLICK'
export const DELETE_USER = "DELETE_USER"
export const DELETE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "UPDATE_USER_FAILURE";


export const getUserInfo = () => (dispatch,getState) => {
  const token = getState().auth.authToken.token;
  dispatch({ type: GET_ALL_USER });
    fetch(`${domain}/profile/`, {
      method: "GET",
        headers: {
         ...jsonHeaders, 
        Authorization: `Token ${token}`,
        
      },
      
    })
      .then((response) => {
        if (!response.ok) {
          response.json().then((err) => {
            throw err;
          });
        }
        return response.json();
      })
      .then((data) => {
        dispatch({ type: GET_ALL_USER_SUCCESS, payload:data });
      })
        .catch((err) => {
          console.log(err)
        dispatch({ type: GET_ALL_USER_FAILURE, payload:err });
      });
};

export const updateUser = (userData,id) => (dispatch, getState) => {
  const token = getState().auth.authToken.token;
  if (userData.body === "") {
    delete userData.body;
  }
  console.log(userData)
  dispatch({ type: UPDATE_USER });
  fetch(`${domain}/profile/${id}/`, {
    method: "PATCH",
    headers: {
      ...jsonHeaders,
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        response.json().then((err) => {
          throw err;
        });
      }
      return response.json();
    })
    .then((data) => {
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
      
    })
    .catch((err) => {
      return Promise.reject(
        dispatch({ type: UPDATE_USER_FAILURE, payload: JSON.stringify(err) })
    )});
};

export const updateUserPassword = (userData, id) => (dispatch, getState) => {
  console.log(userData)
  const token = getState().auth.authToken.token;
  if (userData.password === "") {
    delete userData.password;
  }
  dispatch({ type: UPDATE_USER_PASSWORD });
  fetch(`${domain}/users/${id}/`, {
    method: "PATCH",
    headers: {
      ...jsonHeaders,
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        response.json().then((err) => {
          throw err;
        });
      }
      return response.json();
    })
    .then((data) => {
      dispatch({ type: UPDATE_USER_PASSWORD_SUCCESS, payload: data });
    })
    .catch((err) => {
      dispatch({ type: UPDATE_USER_PASSWORD_FAILURE, payload: err });
    });
};

export const getOwnData = (id) => (dispatch, getState) => {
  const token = getState().auth.authToken.token;
  dispatch({ type: GET_OWN_DATA});
  fetch(`${domain}/profile/id`, {
    method: "GET",
    headers: {
      ...jsonHeaders,
      Authorization: `Token ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        response.json().then((err) => {
          throw err;
        });
      }
      return response.json();
    })
    .then((data) => {
      dispatch({ type: GET_OWN_DATA_SUCCESS, payload: data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: GET_OWN_DATA_FAILURE, payload: err });
    });
};

export const deleteUser = (id) => (dispatch, getState)=> {
  const token = getState().auth.authToken.token;
  console.log(id)
  dispatch({ type: DELETE_USER});
  fetch(`${domain}/users/${id}/`, {
    method: "DELETE",
    headers: {
      ...jsonHeaders,
      Authorization: `Token ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        response.json().then((err) => {
          throw err;
        });
      }
      return response.json();
    })
    .then((data) => {
      dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    })
    .catch((err) => {
      
      return Promise.reject(
        dispatch({ type: DELETE_USER_FAILURE, payload: JSON.stringify(err) })
      );
    });
}




