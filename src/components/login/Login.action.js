import { post, get, setAuthHeaders } from "../services/api";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  PROFILE_REQUEST,
  PROFILE_REQUEST_SUCCESS,
  PROFILE_REQUEST_FAILURE,
} from "./Login.action.constant";

export async function loginUserOrAdmin(baseURL, data, dispatch) {
  dispatch({ type: LOGIN_REQUEST });
  const { error, response } = await post(`${baseURL}`, `${"/login"}`, data);
  if (response) {
    dispatch({ type: LOGIN_SUCCESS, payload: response?.data });
    localStorage.setItem("role", response?.data.role);
    localStorage.setItem("token", response.headers.authorization);
    getProfileDetails(baseURL, dispatch);
  }
  if (error) {
    dispatch({ type: LOGIN_FAILURE });
  }
  return { response, error };
}

export async function getProfileDetails(baseURL, dispatch) {
  dispatch({ type: PROFILE_REQUEST });
  const { error, response } = await get(`${baseURL}`, `${"/profile"}`);
  if (response) {
    dispatch({ type: PROFILE_REQUEST_SUCCESS, payload: response?.data });
  }
  if (error) {
    dispatch({ type: PROFILE_REQUEST_FAILURE });
  }
  return { response, error };
}
