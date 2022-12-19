import { post, get, setAuthHeaders } from "../services/api";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "./Login.action.constant";

export async function loginUserOrAdmin(baseURL, data, dispatch) {
  dispatch({ type: LOGIN_REQUEST });
  const { error, response } = await post(`${baseURL}`, `${"/login"}`, data);
  if (response) {
    dispatch({ type: LOGIN_SUCCESS, data: response?.data });
    localStorage.setItem("token", response.headers.authorization);
    // setAuthHeaders(response.headers.authorization);
  }
  if (error) {
    dispatch({ type: LOGIN_FAILURE });
  }
  return { response, error };
}
