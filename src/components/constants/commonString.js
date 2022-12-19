export const SIGN_IN = {
  SIGN_IN: "Sign In",
  REMEMBER_ME: "Remember me",
  FORGOT_PASSWORD: "Forgot Password?",
  DONT_AN_ACCOUNT: "Don't have an account? Sign Up",
  EMAIL_HELPER_TEXT: "Enter Office Email Address",
  PASSWORD_HELPER_TEXT: "Enter Password",
};

export const SIGN_UP = {
  SIGN_UP: "Sign Up",
  ALREADY_ACCOUNT: "Already have an account? Sign In",
  NAME_HELPER_TEXT: "Enter Full Name",
  DESIGNATION_HELPER_TEXT: "Enter Designation",
  PHONE_HELPER_TEXT: "Enter Phone Number",
  EMAIL_HELPER_TEXT: "Enter Office Email Address",
  PASSWORD_HELPER_TEXT: "Enter Password",
};

export const FORGOT_PASSWORD = {
  FORGOT_PASSWORD: "Forgot Password",
  SEND: "Send",
};

export const ADMIN_APP_BAR_CONSTANT = [
  { id: 1, name: "Users" },
  { id: 2, name: "Rooms" },
  { id: 3, name: "Requests" },
  { id: 4, name: "History" },
];

export const ADMIN_PROFILE_CONSTANT = [{ id: 1, name: "Logout" }];

export const USERS_COLUMN = [
  { id: "slNo", label: "Sl No.", align: "center" },
  { id: "email", label: "User Email", align: "center" },
  { id: "action", label: "Action", align: "center" },
];

export const USER_SCREEN_CONSTANT = {
  ARE_YOU_SURE: "Are you sure? you want to delete this email",
  ADD_USER: "Add User",
};

export const ROOM_SCREEN_CONSTANT = {
  ARE_YOU_SURE: "Are you sure? you want to delete this room details",
  ADD_ROOM: "Add Room",
};

export const ROOMS_CONSTANT = [
  { id: "uid", label: "uid", align: "center" },
  { id: "room_id", label: "Room id", align: "center" },
  { id: "location", label: "Location", align: "center" },
  { id: "added_by", label: "Added by", align: "center" },
  { id: "action", label: "Action", align: "center", minWidth: 250 },
];

export const REQUEST_SCREEN_CONSTANT = {
  ARE_YOU_SURE: "Are you sure? you want to delete this request",
};

export const RQUEST_CONSTANT = [
  { id: "slNo", label: "Sl No.", align: "center" },
  { id: "name", label: "Name", align: "center" },
  { id: "email", label: "Email", align: "center" },
  { id: "contact_no", label: "Contact No.", align: "center" },
  { id: "location", label: "Location", align: "center" },
  { id: "project", label: "Project/ Client", align: "center" },
  { id: "bu", label: "BU", align: "center" },
  { id: "approved", label: "Approved By", align: "center" },
  { id: "check_in", label: "Check In", align: "center" },
  { id: "check_out", label: "Check Out", align: "center" },
  { id: "purpose_of_visit", label: "Purpose Of Visit", align: "center" },
  { id: "action", label: "Action", align: "center", minWidth: 250 },
];

export const REQUEST_TYPE = ["Pending", "Approved"];

export const ROOM_STATUS = ["Booked", "Available"];

export const HISTORY_CONSTANT = [
  { id: "slNo", label: "Sl No.", align: "center" },
  { id: "name", label: "Name", align: "center" },
  { id: "email", label: "Email", align: "center" },
  { id: "contact_no", label: "Contact No.", align: "center" },
  { id: "location", label: "Location", align: "center" },
  { id: "project", label: "Project/ Client", align: "center" },
  { id: "bu", label: "BU", align: "center" },
  { id: "approved", label: "Approved By", align: "center" },
  { id: "check_in", label: "Check In", align: "center" },
  { id: "check_out", label: "Check Out", align: "center" },
  { id: "purpose_of_visit", label: "Purpose Of Visit", align: "center" },
  { id: "alloted_room", label: "Alloted Room", align: "center" },
  {
    id: "approved_current_time",
    label: "Approved Current Time",
    align: "center",
  },
];

export const HISTORY_SCREEN_CONSTANT = {
  ARE_YOU_SURE: "Are you sure? you want to delete this request",
};

export const ROOM_REQUEST = {
  ROOM_REQUEST_FORM: "Room Request Form",
  SEND: "Send",
};

export const EXTEND_OR_CANCEL_REQUEST = {
  EXTEND_REQUEST: "Extend Request Form",
  SEND: "Send",
};

export const PROFILE_INFO = {
  NAME: "abcdef",
  DESIGNATION: "Software Developer",
  PHONE_NO: "1234567890",
  EMAIL: "abcdef@excellarate.com",
};
