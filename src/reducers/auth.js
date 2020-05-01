import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT
} from "../actions";

const initialState = {
    loginLoading: false,
    authToken: '',
    loginError:null,
  registerLoading: false,
  registerSuccess: null,
  registerError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        registerLoading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerLoading: false,
        registerSuccess: action.payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        registerError: action.payload,
        registerLoading: false,
      };
    case LOGIN:
      return {
        ...state,
        loginLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        authToken: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loginError: action.payload,
        loginLoading: false,
      };
    case LOGOUT:
      return {
        ...initialState
      }
    default:
      return state;
  }
};
