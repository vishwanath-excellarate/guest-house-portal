import { combineReducers } from "redux";
import loginReducer from "../login/Login.reducer";
import userReducer from "../admin/users/User.reducer";
import roomReducer from "../admin/rooms/Room.reducer";


export const reducer = combineReducers({
  loginReducer,
  userReducer,
  roomReducer,

});
