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
  delete userData.password;
  if (userData.body === "") {
    delete userData.body;
  }
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
      dispatch({ type: UPDATE_USER_FAILURE, payload:err });
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




