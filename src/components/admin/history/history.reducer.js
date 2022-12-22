import {
  HISTORY_REQUEST,
  HISTORY_SUCCESS,
  HISTORY_FAILURE,
} from "./history.action.constants";

const initialState = Object.freeze({
  historyReqResult: [],
  historyReqStatus: null,
  historyReqError: null,
});

export default function historyReqReducer(state = initialState, action) {
  switch (action.type) {
    case HISTORY_REQUEST: {
      return {
        ...state,
        historyReqError: null,
        historyReqStatus: "started",
      };
    }

    case HISTORY_SUCCESS: {
      const data = action.payload;

      return {
        ...state,
        historyReqError: null,
        historyReqStatus: "finished",
        historyReqResult: data,
      };
    }

    case HISTORY_FAILURE: {
      return {
        ...state,
        historyReqError: "error",
        historyReqStatus: "failled",
        historyReqResult: [],
      };
    }

    default:
      return state;
  }
}
