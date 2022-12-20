import { get, post } from "../services/api";
import {
    GET_PROFILE_DATA_REQUEST,
    GET_PROFILE_DATA_SUCCESS,
    GET_PROFILE_DATA_FAILURE,
} from "./Dashboard.action.constants";



export async function getProfileRequest(baseURL, dispatch) {
  dispatch({ type: GET_PROFILE_DATA_REQUEST });
  const { error, response } = await get(`${baseURL}`, `${"/profile"}`);
  if (response) {
    dispatch({ type: GET_PROFILE_DATA_SUCCESS, payload: response?.data.result });
  }
  if (error) {
    dispatch({ type: GET_PROFILE_DATA_FAILURE });
  }
  return { response, error };
}

