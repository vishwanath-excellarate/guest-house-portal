import { combineReducers } from "redux";
import loginReducer from "../login/Login.reducer";
import userReducer from "../admin/users/User.reducer";

export const reducer = combineReducers({
  loginReducer,
  userReducer,
});
