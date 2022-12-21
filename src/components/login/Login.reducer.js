import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  PROFILE_REQUEST_SUCCESS,
  PROFILE_REQUEST_FAILURE,
  PROFILE_REQUEST,
  FORGOT_REQUEST, 
  FORGOT_SUCCESS, 
  FORGOT_FAILURE,
  RESET_REQUEST, 
  RESET_SUCCESS, 
  RESET_FAILURE,
} from "./Login.action.constant";

const initialState = Object.freeze({
  loginResult: [],
  loginRequestStatus: null,
  loginRequestError: null,
  profileInfo: [],
  profileInfoStatus: null,
  profileInfoError: null,
  forgotResult:[],
  forgotRequestStatus:null, 
  forgotRequestError:null,
  resetResult:[],
  resetRequestStatus:null, 
  resetRequestError:null,
  


});

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequestError: null,
        loginRequestStatus: "started",
      };
    }

    case LOGIN_SUCCESS: {
      const data = action.payload;

      return {
        ...state,
        loginRequestError: null,
        loginRequestStatus: "finished",
        loginResult: data,
      };
    }

    case LOGIN_FAILURE: {
      return {
        ...state,
        loginRequestError: "error",
        loginRequestStatus: "failled",
        loginResult: [],
      };
    }

    case PROFILE_REQUEST: {
      return {
        ...state,
        profileInfoError: null,
        profileInfoStatus: "started",
      };
    }

    case PROFILE_REQUEST_SUCCESS: {
      const data = action.payload.result;

      return {
        ...state,
        profileInfoError: null,
        profileInfoStatus: "finished",
        profileInfo: data,
      };
    }

    case PROFILE_REQUEST_FAILURE: {
      return {
        ...state,
        profileInfoError: "error",
        profileInfoStatus: "failled",
        profileInfo: [],
      };
    }

    case FORGOT_REQUEST: {
      return {
        ...state,
        forgotRequestError: null,
        forgotRequestStatus: "started",
      };
    }

    case FORGOT_SUCCESS: {
      const data = action.payload.result;

      return {
        ...state,
        forgotRequestError: null,
        forgotRequestStatus: "finished",
        forgotResult: data,
      };
    }

    case FORGOT_FAILURE: {
      return {
        ...state,
        forgotRequestError: "error",
        forgotRequestStatus: "failled",
        forgotResult: [],
      };
    }
    case RESET_REQUEST: {
      return {
        ...state,
        resetRequestError: null,
        resetRequestStatus: "started",
      };
    }

    case RESET_SUCCESS: {
      const data = action.payload.result;

      return {
        ...state,
        resetRequestError: null,
        resetRequestStatus: "finished",
        resetResult: data,
      };
    }

    case RESET_FAILURE: {
      return {
        ...state,
        resetRequestError: "error",
        resetRequestStatus: "failled",
        resetResult: [],
      };
    }

    default:
      return state;
  }
}
