import { combineReducers } from "redux";
import loginReducer from "../login/Login.reducer";
import userReducer from "../admin/users/User.reducer";
import userAccountRegReducer from "../user/accountReg/AccountRegister.reducer";
import userRoomRequestReducer from "../Dashboard/dashboard.reducer";
import roomRequestsReducer from "../admin/requests/requests.reducer";
import roomReducer from "../admin/rooms/Room.reducer";
import historyReqReducer from "../admin/history/history.reducer";

export const reducer = combineReducers({
  loginReducer,
  userReducer,
  userAccountRegReducer,
  userRoomRequestReducer,
  roomRequestsReducer,
  roomReducer,
  historyReqReducer,
});
