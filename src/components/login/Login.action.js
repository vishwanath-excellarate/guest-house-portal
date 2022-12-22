import {
  getAllRomRequests,
  getAvailableRoom,
  getExtendRomRequests,
} from "../admin/requests/requests.action";
import { getRooms } from "../admin/rooms/Room.action";
import { getUserRequest } from "../admin/users/User.action";
import { userRole } from "../constants/commonString";
import { userMyRequest } from "../Dashboard/dashboard.action";
import { post, get } from "../services/api";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  PROFILE_REQUEST,
  PROFILE_REQUEST_SUCCESS,
  PROFILE_REQUEST_FAILURE,
  FORGOT_REQUEST, 
  FORGOT_SUCCESS,
  FORGOT_FAILURE,
  RESET_REQUEST,
  RESET_SUCCESS,
  RESET_FAILURE,
} from "./Login.action.constant";

export async function loginUserOrAdmin(baseURL, data, dispatch) {
  dispatch({ type: LOGIN_REQUEST });
  const { error, response } = await post(`${baseURL}`, `${"/login"}`, data);
  if (response) {
    dispatch({ type: LOGIN_SUCCESS, payload: response?.data });
    localStorage.setItem("role", response?.data.role);
    localStorage.setItem("token", response.headers.authorization);
    await getProfileDetails(baseURL, dispatch);
    if (response?.data.role === userRole.ADMIN) {
      getUserRequest(baseURL, dispatch);
      getRooms(baseURL, dispatch);
      getAllRomRequests(baseURL, dispatch);
      getAvailableRoom(baseURL, dispatch);
      getExtendRomRequests(baseURL, dispatch);
    }
    if (response?.data.role === userRole.EMPLOYEE) {
      await userMyRequest(baseURL, dispatch);
    }
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
export async function forgot(baseURL, data, dispatch) {
  dispatch({ type: FORGOT_REQUEST });
  const { error, response } = await post(`${baseURL}`, `${"/forgot"}`, data);
  if (response) {
    dispatch({ type: FORGOT_SUCCESS, payload: response?.data });
  }
  if (error) {
    dispatch({ type: FORGOT_FAILURE });
  }
  return { response, error };
}

export async function reset(baseURL, data, dispatch, navigate) {
  dispatch({ type: RESET_REQUEST });
  const { error, response } = await post(`${baseURL}`, `${"/reset"}`, data);
  if (response) {
    dispatch({ type: RESET_SUCCESS, payload: response?.data });
    navigate("/login");

  }
  if (error) {
    dispatch({ type: RESET_FAILURE });
  }
  return { response, error };
}