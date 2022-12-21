import { GET_ALL_REQUESTS } from "./requests.action.constants";

const initialState = Object.freeze({
  allRoomRequests: [],
});

export default function roomRequestsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_REQUESTS: {
      const data = action.payload;
      return {
        ...state,
        allRoomRequests: data,
      };
    }

    default:
      return state;
  }
}
