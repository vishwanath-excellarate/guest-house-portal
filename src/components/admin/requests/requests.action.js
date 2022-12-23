import { get, post } from "../../services/api";
import {
  GET_ALL_REQUESTS,
  GET_AVAILABLE_ROOMS,
  ALLOCATE_ROOM_REQUEST,
  EXTEND_ROOM_REQUESTS,
  POST_EXTEND_ROOM_REQUESTS,
  DECLINE_EXTEND_ROOM_REQUESTS,
} from "./requests.action.constants";

export async function getAllRomRequests(baseURL, dispatch) {
  const { error, response } = await get(`${baseURL}`, `${"/all-request"}`);
  if (response) {
    dispatch({ type: GET_ALL_REQUESTS, payload: response?.data.result });
  }
  if (error) {
    console.log("error", error);
  }
  return { response, error };
}

export async function getAvailableRoom(baseURL, dispatch) {
  const { error, response } = await get(`${baseURL}`, `${"/available-room"}`);
  if (response) {
    dispatch({ type: GET_AVAILABLE_ROOMS, payload: response?.data.result });
  }
  if (error) {
    console.log("error", error);
  }
  return { response, error };
}

// assign room request

export async function allocateRoom(baseURL, data, dispatch) {
  const { error, response } = await post(
    `${baseURL}`,
    `${"/assign-room"}`,
    data
  );
  if (response) {
    dispatch({ type: ALLOCATE_ROOM_REQUEST, payload: response?.data });
    await getAllRomRequests(baseURL, dispatch);
    await getAvailableRoom(baseURL, dispatch);
  }
  if (error) {
    console.log("error", error);
  }
  return { response, error };
}

// delete room request

export async function deleteRoomRequest(baseURL, data, dispatch) {
  const { error, response } = await post(
    `${baseURL}`,
    `${"/decline-request"}`,
    data
  );
  if (response) {
    console.log("response", response);
  }
  if (error) {
    console.log("error", error);
  }
  return { response, error };
}

// get extend room request
export async function getExtendRomRequests(baseURL, dispatch) {
  const { error, response } = await get(
    `${baseURL}`,
    `${"/all-extended-request"}`
  );
  if (response) {
    dispatch({ type: EXTEND_ROOM_REQUESTS, payload: response?.data.result });
  }
  if (error) {
    console.log("error", error);
  }
  return { response, error };
}

// approve extend room request
export async function extendRoomRequest(baseURL, data, dispatch) {
  const { error, response } = await post(
    `${baseURL}`,
    `${"/approve-extended-request"}`,
    data
  );
  if (response) {
    await getExtendRomRequests(baseURL, dispatch);
    dispatch({ type: POST_EXTEND_ROOM_REQUESTS, payload: response?.data });
  }
  if (error) {
    console.log("error", error);
  }
  return { response, error };
}

// decline extend room request
export async function declineExtendRoomRequest(baseURL, data, dispatch) {
  const { error, response } = await post(
    `${baseURL}`,
    `${"/decline-extended-request"}`,
    data
  );
  if (response) {
    await getExtendRomRequests(baseURL, dispatch);
    dispatch({ type: DECLINE_EXTEND_ROOM_REQUESTS, payload: response?.data });
  }
  if (error) {
    console.log("error", error);
  }
  return { response, error };
}
