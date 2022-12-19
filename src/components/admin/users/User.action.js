import { post } from "../../services/api";
import {
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
} from "./User.action.constants";


export async function addUserRequest(baseURL, data, dispatch) {
  dispatch({ type: ADD_USER_REQUEST });
  const { error, response } = await post(`${baseURL}`, `${"/add-user"}`, data);
  if (response) {
    dispatch({ type: ADD_USER_SUCCESS, data: response?.data });
  }
  if (error) {
    dispatch({ type: ADD_USER_FAILURE });
  }
  return { response, error };
}
