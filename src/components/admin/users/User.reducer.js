import {
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
} from "./User.action.constants";

const initialState = Object.freeze({
  result: [],
  requestStatus: null,
  requestError: null,
});

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER_REQUEST: {
      return {
        ...state,
        requestError: null,
        requestStatus: "started",
      };
    }

    case ADD_USER_SUCCESS: {
      const data = action.payload;

      return {
        ...state,
        requestError: null,
        requestStatus: "finished",
        result: data,
      };
    }

    case ADD_USER_FAILURE: {
      return {
        ...state,
        requestError: "error",
        requestStatus: "failled",
        result: [],
      };
    }

    default:
      return state;
  }
}
