import {
  HISTORY_FAILURE,
  HISTORY_REQUEST,
  HISTORY_SUCCESS,
} from "./history.action.constants";
import { get } from "../../services/api";

export async function getHistoryRequests(baseURL, dispatch) {
  dispatch({ type: HISTORY_REQUEST });
  const { error, response } = await get(`${baseURL}`, `${"/history"}`);
  if (response) {
    dispatch({ type: HISTORY_SUCCESS, payload: response?.data?.result });
  }
  if (error) {
    dispatch({ type: HISTORY_FAILURE });
  }
  return { response, error };
}
