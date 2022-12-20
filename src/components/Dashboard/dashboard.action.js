import { post } from "../services/api";
import {
  USER_ROOM_REQUEST,
  USER_ROOM_REQUEST_SUCCESS,
  USER_ROOM_REQUEST_FAILURE,
} from "./dashboard.action.constants";

export async function userRoomRequest(baseURL, data, dispatch) {
  dispatch({ type: USER_ROOM_REQUEST });
  const { error, response } = await post(
    `${baseURL}`,
    `${"/room-requests"}`,
    data
  );
  if (response) {
    dispatch({ type: USER_ROOM_REQUEST_SUCCESS, payload: response?.data });
  }
  if (error) {
    dispatch({ type: USER_ROOM_REQUEST_FAILURE });
  }
  return { response, error };
}
