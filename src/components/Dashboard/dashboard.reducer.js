import {
  USER_ROOM_REQUEST,
  USER_ROOM_REQUEST_SUCCESS,
  USER_ROOM_REQUEST_FAILURE,
  USER_MY_REQUEST,
  USER_MY_REQUEST_FAILURE,
} from "./dashboard.action.constants";

const initialState = Object.freeze({
  userResult: [],
  userRequestStatus: null,
  userRequestError: null,
});

export default function userRoomRequestReducer(state = initialState, action) {
  switch (action.type) {
    case USER_ROOM_REQUEST: {
      return {
        ...state,
        userRequestError: null,
        userRequestStatus: "started",
      };
    }

    case USER_ROOM_REQUEST_SUCCESS: {
      const data = action.payload;

      return {
        ...state,
        userRequestError: null,
        userRequestStatus: "finished",
        userResult: data,
      };
    }

    case USER_ROOM_REQUEST_FAILURE: {
      return {
        ...state,
        userRequestError: "error",
        userRequestStatus: "failled",
        userResult: [],
      };
    }
    case USER_MY_REQUEST: {
      return {
        ...state,
        userRequestError: null,
        userRequestStatus: "started",
      };
    }

    case USER_ROOM_REQUEST_SUCCESS: {
      const data = action.payload;

      return {
        ...state,
        userRequestError: null,
        userRequestStatus: "finished",
        userResult: data,
      };
    }

    case USER_MY_REQUEST_FAILURE: {
      return {
        ...state,
        userRequestError: "error",
        userRequestStatus: "failled",
        userResult: [],
      };
    }

    default:
      return state;
  }
}
