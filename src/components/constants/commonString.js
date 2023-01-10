export const COMMON_STRING = {
  DELETE: "Delete",
  APPROVE: "Approve",
  DECLINE: "Decline",
  CHECK_OUT: "Check Out",
  EXTEND_ROOM_REQUEST: "Extend Room Request",
  SEND: "Send",
  EXTEND_REQUEST: "Extend Request",
};

export const SIGN_IN = {
  SIGN_IN: "Sign In",
  REMEMBER_ME: "Remember me",
  FORGOT_PASSWORD: "Forgot Password?",
  DONT_AN_ACCOUNT: "Don't have an account? Sign Up",
  EMAIL_HELPER_TEXT: "Enter Office Email Address",
  PASSWORD_HELPER_TEXT: "Enter Password",
};

export const ACCOUNT_SETUP = {
  ACCOUNT_REGISTER: "Account Register",
  REGISTER: "Register",
  NAME_HELPER_TEXT: "Enter Full Name",
  DESIGNATION_HELPER_TEXT: "Enter Designation",
  PHONE_HELPER_TEXT: "Enter Phone Number",
  EMAIL_HELPER_TEXT: "Enter Office Email Address",
  PASSWORD_HELPER_TEXT: "Enter Password",
  GENDER_HELPER_TEXT: "Select Gender",
  GENDER: ["Male", "Female", "Other"],
};

export const FORGOT_PASSWORD = {
  FORGOT_PASSWORD: "Forgot Password",
  SEND: "Send",
  RESET: "Update Password",
  RESET_TITLE: "Reset Password",
};

export const ADMIN_APP_BAR_CONSTANT = [
  { id: 1, name: "Users" },
  { id: 2, name: "Rooms" },
  { id: 3, name: "Requests" },
  { id: 4, name: "Extend Requests" },
  { id: 5, name: "History" },
];

export const ADMIN_PROFILE_CONSTANT = [{ id: 1, name: "Logout" }];

export const USERS_COLUMN = [
  { id: "slNo", label: "Sl No.", align: "center" },
  { id: "email", label: "User Email", align: "center" },
  { id: "action", label: "Action", align: "center" },
];

export const USER_SCREEN_CONSTANT = {
  ARE_YOU_SURE: "Delete the mail?",
  SUB_TEXT: "You will not be able to recover it",
  ADD_USER: "Add User",
};

export const ROOM_SCREEN_CONSTANT = {
  ARE_YOU_SURE: "Delete the room?",
  SUB_TEXT: "You will not be able to recover it",
  ADD_ROOM: "Add Room",
};

export const ROOMS_CONSTANT = [
  { id: "slNo", label: "Sl No.", align: "center" },
  { id: "location", label: "Location", align: "center" },
  { id: "room_id", label: "Room No", align: "center" },
  { id: "action", label: "Action", align: "center", minWidth: 250 },
];

export const REQUEST_SCREEN_CONSTANT = {
  ARE_YOU_SURE: "Delete the request?",
  SUB_TEXT: "You will not be able to recover it",
};

export const RQUEST_CONSTANT = [
  { id: "slNo", label: "Sl No.", align: "center" },
  { id: "name", label: "Name", align: "center" },
  { id: "email", label: "Email", align: "center" },
  { id: "contact_no", label: "Contact No.", align: "center" },
  { id: "gender", label: "Gender", align: "center" },
  { id: "location", label: "Location", align: "center" },
  { id: "project", label: "Project/ Client", align: "center" },
  { id: "bu", label: "BU", align: "center" },
  { id: "approved", label: "Approved By", align: "center" },
  { id: "check_in", label: "Check In", align: "center" },
  { id: "check_out", label: "Check Out", align: "center" },
  { id: "room_id", label: "Room No", align: "center" },
  { id: "purpose_of_visit", label: "Purpose Of Visit", align: "center" },
  { id: "status", label: "Status", align: "center" },
  { id: "action", label: "Action", align: "center", minWidth: 200 },
];

export const REQUEST_TYPE = ["All", "Pending", "Approved"];

export const ROOM_STATUS = ["Booked", "Available"];

export const HISTORY_CONSTANT = [
  { id: "slNo", label: "Sl No.", align: "center" },
  { id: "name", label: "Name", align: "center" },
  { id: "email", label: "Email", align: "center" },
  { id: "contact_no", label: "Contact No.", align: "center" },
  { id: "gender", label: "Gender", align: "center" },
  { id: "location", label: "Location", align: "center" },
  { id: "project", label: "Project/ Client", align: "center" },
  { id: "bu", label: "BU", align: "center" },
  { id: "approved", label: "Approved By", align: "center" },
  { id: "check_in", label: "Check In", align: "center" },
  { id: "check_out", label: "Check Out", align: "center" },
  // { id: "alloted_room", label: "Alloted Room", align: "center" },
  {
    id: "arrival_time",
    label: "Arrival Time",
    align: "center",
  },
  { id: "constant_room_no", label: "Allotment Room", align: "center" },
  { id: "purpose_of_visit", label: "Purpose Of Visit", align: "center" },
  { id: "status", label: "Status", align: "center" },
];

export const HISTORY_SCREEN_CONSTANT = {
  ARE_YOU_SURE: "Are you sure? you want to delete this request",
};

export const ROOM_REQUEST = {
  ROOM_REQUEST_FORM: "Room Request Form",
  SEND: "Send",
  BU_REQUIRED: "BU is required",
  PROJECT: "Project/Client is required",
  LOCATION: "Location is required",
  APPROVED_BY: "Approved is required",
  CHECK_IN: "Check In is required",
  CHECK_OUT: "Check Out is required",
  PURPOSE_OF_VISIT: "Purpose of visit is required",
  TIME: "Time is required",
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

export const MY_RQUEST_CONSTANT = [
  { id: "slNo", label: "Sl No.", align: "center" },
  { id: "location", label: "Location", align: "center" },
  { id: "project", label: "Project/ Client", align: "center" },
  { id: "bu", label: "BU", align: "center" },
  { id: "approved", label: "Approved By", align: "center" },
  { id: "check_in", label: "Check In", align: "center" },
  { id: "check_out", label: "Check Out", align: "center" },
  { id: "arrival_time", label: "Arrival Time", align: "center" },
  { id: "purpose_of_visit", label: "Purpose Of Visit", align: "center" },
  { id: "constant_room_no", label: "Allotment Room", align: "center" },
  { id: "room_id", label: "Room No", align: "center" },
  { id: "status", label: "Status", align: "center" },
  { id: "action", label: "Action", align: "center", minWidth: 350 },
];

export const EXTEND_RQUEST_CONSTANT = [
  { id: "slNo", label: "Sl No.", align: "center" },
  { id: "name", label: "Name", align: "center" },
  { id: "email", label: "Email", align: "center" },
  { id: "contact_no", label: "Contact No.", align: "center" },
  { id: "gender", label: "Gender", align: "center" },
  { id: "location", label: "Location", align: "center" },
  { id: "project", label: "Project/ Client", align: "center" },
  { id: "bu", label: "BU", align: "center" },
  { id: "approved", label: "Approved By", align: "center" },
  { id: "check_in", label: "Check In", align: "center" },
  { id: "check_out", label: "Check Out", align: "center" },
  { id: "new_checkout", label: "New Check Out", align: "center" },
  { id: "room_id", label: "Room No", align: "center" },
  { id: "arrival_time", label: "Arrival Time", align: "center" },
  { id: "reason", label: "Reason", align: "center", minWidth: 200 },
  { id: "purpose_of_visit", label: "Purpose Of Visit", align: "center" },
  { id: "status", label: "Status", align: "center" },
  { id: "action", label: "Action", align: "center", minWidth: 300 },
];

export const APPROVED_RQUEST_CONSTANT = [
  { id: "slNo", label: "Sl No.", align: "center" },
  { id: "location", label: "Location", align: "center" },
  { id: "project", label: "Project/ Client", align: "center" },
  { id: "bu", label: "BU", align: "center" },
  { id: "approved", label: "Approved By", align: "center" },
  { id: "check_in", label: "Check In", align: "center" },
  { id: "check_out", label: "Check Out", align: "center" },
  { id: "arrival_time", label: "Arrival Time", align: "center" },
  { id: "constant_room_no", label: "Allotment Room", align: "center" },
  { id: "room_id", label: "Room No", align: "center" },
  { id: "status", label: "Status", align: "center" },
  { id: "purpose_of_visit", label: "Purpose Of Visit", align: "center" },
];

export const userRole = {
  ADMIN: "admin",
  EMPLOYEE: "employee",
};

export const DOWNLOAD = "download";

export const SECRET_KEY = "excellarate 123456";

export const BU_LIST = [
  "BU-1-(CHC)",
  "BU-3-(DX)",
  "BU-4-(MS)",
  "BU-6-(SDQ)",
  "BU-7-(ADI)",
  "BU-8",
  "BU-10",
  "Hyd-1-(HC)",
  "Hyd-2-(FIN)",
  "Hyd-3-(EM)",
  "G&A",
  "S&M",
  "NoOps HBU",
];
