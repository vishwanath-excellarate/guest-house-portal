import { combineReducers } from "redux";
import loginReducer from "../login/Login.reducer";
import userReducer from "../admin/users/User.reducer";
import userAccountRegReducer from "../user/accountReg/AccountRegister.reducer";

export const reducer = combineReducers({
  loginReducer,
  userReducer,
  userAccountRegReducer,
});
