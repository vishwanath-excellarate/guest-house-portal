import {
    GET_PROFILE_DATA_REQUEST,
    GET_PROFILE_DATA_SUCCESS,
    GET_PROFILE_DATA_FAILURE,
  } from "./Dashboard.action.constants";
  
  const initialState = Object.freeze({
    result: [],
    requestStatus: null,
    requestError: null,
    getProfileRes: [],
    getProfileStatus: null,
    getProfileError: null,
  });
  
  export default function profileReducer(state = initialState, action) {
    switch (action.type) {
     
      case GET_PROFILE_DATA_REQUEST: {
        return {
          ...state,
          getProfileError: null,
          getProfileStatus: "started",
        };
      }
  
      case GET_PROFILE_DATA_SUCCESS: {
        const data = action.payload;
        return {
          ...state,
          getProfileError: null,
          getProfileStatus: "finished",
          getProfileRes: data,
        };
      }
  
      case GET_PROFILE_DATA_FAILURE: {
        return {
          ...state,
          getProfileError: "error",
          getProfileStatus: "failled",
          getProfileRes: [],
        };
      }
  
      default:
        return state;
    }
  }
  