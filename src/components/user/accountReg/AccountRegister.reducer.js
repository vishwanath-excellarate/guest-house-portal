import {
  ACCOUNT_REG_REQUEST,
  ACCOUNT_REG_SUCCESS,
  ACCOUNT_REG_FAILURE,
} from "./AccountRegister.action.constants";

const initialState = Object.freeze({
  userRegResult: [],
  userRegRequestStatus: null,
  userRegRequestError: null,
});

export default function userAccountRegReducer(state = initialState, action) {
  switch (action.type) {
    case ACCOUNT_REG_REQUEST: {
      return {
        ...state,
        userRegRequestStatus: null,
        userRegRequestError: "started",
      };
    }

    case ACCOUNT_REG_SUCCESS: {
      const data = action.payload;

      return {
        ...state,
        userRegRequestStatus: null,
        userRegRequestError: "finished",
        userRegResult: data,
      };
    }

    case ACCOUNT_REG_FAILURE: {
      return {
        ...state,
        userRegRequestStatus: "error",
        userRegRequestError: "failled",
        userRegResult: [],
      };
    }

    default:
      return state;
  }
}
