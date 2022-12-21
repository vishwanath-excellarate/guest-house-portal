import { get } from "../../services/api";
import { GET_ALL_REQUESTS } from "./requests.action.constants";

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
