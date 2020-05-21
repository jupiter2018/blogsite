import {
  GET_ALL_USER,
  GET_ALL_USER_FAILURE,
  GET_ALL_USER_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  GET_OWN_DATA_SUCCESS,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_FAILURE,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
} from "../actions";

const initialState = {
  allUsersLoading: false,
  allUsers: [],
  getAllUsersError: null,
  updateUserLoading:false,
  updateUserSuccess: null,
  updateUserError: null,
  getOwnDataSuccess: null,
  updateUserPasswordLoading:null,
  updateUserPasswordSuccess: null,
  updateUserPasswordFailure: null,
  
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER:
      return {
        ...state,
        allUsersLoading: true,
      };
    case GET_ALL_USER_SUCCESS:
      return {
        ...state,
        allUsersLoading: false,
        allUsers: action.payload,
      };
    case GET_ALL_USER_FAILURE:
      return {
        ...state,
        getAllUsersError: action.payload,
        allUsersLoading: false,
      };
    case UPDATE_USER:
      return {
        ...state, updateUserLoading:true
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state, updateUserSuccess:action.payload
      }
    case UPDATE_USER_FAILURE:
      return {
        ...state, updateUserError:action.payload
      }
    case UPDATE_USER_PASSWORD:
      return {
        ...state, updateUserPasswordLoading:true
      }
    case UPDATE_USER_PASSWORD_SUCCESS:
      return {
        ...state , updateUserPasswordSuccess:action.payload
      }
    case UPDATE_USER_PASSWORD_FAILURE:
      return {
        ...state, updateUserPasswordFailure:action.payload
      }
    
    case GET_OWN_DATA_SUCCESS:
      return {
        ...state, getOwnDataSuccess:action.payload
      }
    case DELETE_USER_SUCCESS:
      return {
        ...initialState
      }
    
    default:
      return state;
  }
};
