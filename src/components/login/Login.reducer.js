import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "./Login.action.constant";

const initialState = Object.freeze({
  loginResult: [],
  loginRequestStatus: null,
  loginRequestError: null,
});

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginOrRegRequestError: null,
        loginOrRegRequestStatus: "started",
      };
    }

    case LOGIN_SUCCESS: {
      const data = action.payload;

      return {
        ...state,
        loginOrRegRequestError: null,
        loginOrRegRequestStatus: "finished",
        loginResult: data,
      };
    }

    case LOGIN_FAILURE: {
      return {
        ...state,
        loginOrRegRequestError: "error",
        loginOrRegRequestStatus: "failled",
        loginResult: [],
      };
    }

    default:
      return state;
  }
}
