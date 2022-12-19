import { get, post } from "../../services/api";
import {
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from "./User.action.constants";

export async function addUserRequest(baseURL, data, dispatch) {
  dispatch({ type: ADD_USER_REQUEST });
  const { error, response } = await post(`${baseURL}`, `${"/add-user"}`, data);
  if (response) {
    dispatch({ type: ADD_USER_SUCCESS, payload: response?.data });
  }
  if (error) {
    dispatch({ type: ADD_USER_FAILURE });
  }
  return { response, error };
}

export async function getUserRequest(baseURL, dispatch) {
  dispatch({ type: GET_USER_REQUEST });
  const { error, response } = await get(`${baseURL}`, `${"/get-users"}`);
  if (response) {
    dispatch({ type: GET_USER_SUCCESS, payload: response?.data.result });
  }
  if (error) {
    dispatch({ type: GET_USER_FAILURE });
  }
  return { response, error };
}
