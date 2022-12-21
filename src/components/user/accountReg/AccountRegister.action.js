import { post } from "../../services/api";
import {
  ACCOUNT_REG_REQUEST,
  ACCOUNT_REG_SUCCESS,
  ACCOUNT_REG_FAILURE,
} from "./AccountRegister.action.constants";

export async function userAccountReg(baseURL, data, dispatch, navigate) {
  dispatch({ type: ACCOUNT_REG_REQUEST });
  const { error, response } = await post(
    `${baseURL}`,
    `${"/account-setup"}`,
    data
  );
  if (response) {
    dispatch({ type: ACCOUNT_REG_SUCCESS, payload: response?.data });
    navigate("/login");
  }
  if (error) {
    dispatch({ type: ACCOUNT_REG_FAILURE });
  }
  return { response, error };
}
