import { getHistoryRequests } from "../admin/history/history.action";
import {
  getAllRomRequests,
  getAvailableRoom,
  getExtendRomRequests,
} from "../admin/requests/requests.action";
import { getRooms } from "../admin/rooms/Room.action";
import { getUserRequest } from "../admin/users/User.action";
import { userRole } from "../constants/commonString";
import { setEncryptLocalStorage } from "../constants/utils";
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
    setEncryptLocalStorage("role", response?.data.role);
    setEncryptLocalStorage("token", response.headers.authorization);
    setEncryptLocalStorage("loginSession", new Date().getTime(), false);
    await getProfileDetails(baseURL, dispatch);
    if (response?.data.role === userRole.ADMIN) {
      await getUserRequest(baseURL, dispatch);
      await getRooms(baseURL, dispatch);
      await getAllRomRequests(baseURL, dispatch);
      await getAvailableRoom(baseURL, dispatch);
      await getExtendRomRequests(baseURL, dispatch);
      await getHistoryRequests(baseURL, dispatch);
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
