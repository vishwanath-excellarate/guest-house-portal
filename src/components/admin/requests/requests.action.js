import { get, post } from "../../services/api";
import {
  GET_ALL_REQUESTS,
  GET_AVAILABLE_ROOMS,
  ALLOCATE_ROOM_REQUEST,
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
