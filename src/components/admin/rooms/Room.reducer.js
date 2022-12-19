import {
    ADD_ROOM_REQUEST,
    ADD_ROOM_SUCCESS,
    ADD_ROOM_FAILURE,
    GET_ROOM_REQUEST,
    GET_ROOM_SUCCESS,
    GET_ROOM_FAILURE,
  } from "./Room.action.constants";
  
  const initialState = Object.freeze({
    result: [],
    requestStatus: null,
    requestError: null,
    getUserRes: [],
    getUserStatus: null,
    getUserError: null,
  });
  
  export default function roomReducer(state = initialState, action) {
    switch (action.type) {
      case ADD_ROOM_REQUEST: {
        return {
          ...state,
          requestError: null,
          requestStatus: "started",
        };
      }
  
      case ADD_ROOM_SUCCESS: {
        const data = action.payload;
  
        return {
          ...state,
          requestError: null,
          requestStatus: "finished",
          result: data,
        };
      }
  
      case ADD_ROOM_FAILURE: {
        return {
          ...state,
          requestError: "error",
          requestStatus: "failled",
          result: [],
        };
      }
      case GET_ROOM_REQUEST: {
        return {
          ...state,
          requestError: "error",
          requestStatus: "failled",
          result: [],
        };
      }
  
      case GET_ROOM_SUCCESS: {
        return {
          ...state,
          requestError: "error",
          requestStatus: "failled",
          result: [],
        };
      }
  
      case GET_ROOM_FAILURE: {
        return {
          ...state,
          requestError: "error",
          requestStatus: "failled",
          result: [],
        };
      }
  
      
      default:
        return state;
    }
  }
  