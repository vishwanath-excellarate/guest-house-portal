import {
  GET_ALL_REQUESTS,
  GET_AVAILABLE_ROOMS,
  ALLOCATE_ROOM_REQUEST,
} from "./requests.action.constants";

const initialState = Object.freeze({
  allRoomRequests: [],
  availableRooms: [],
  roomAllocation: null,
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

    case GET_AVAILABLE_ROOMS: {
      const data = action.payload;
      return {
        ...state,
        availableRooms: data,
      };
    }

    case ALLOCATE_ROOM_REQUEST: {
      const data = action.payload;
      return {
        ...state,
        roomAllocation: data,
      };
    }

    default:
      return state;
  }
}
