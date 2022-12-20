import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  PROFILE_REQUEST_SUCCESS,
  PROFILE_REQUEST_FAILURE,
  PROFILE_REQUEST,
} from "./Login.action.constant";

const initialState = Object.freeze({
  loginResult: [],
  loginRequestStatus: null,
  loginRequestError: null,
  profileInfo: [],
  profileInfoStatus: null,
  profileInfoError: null,
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

    default:
      return state;
  }
}
