export const environment = "development"; // THIS LINE NEED TO UPDATE

export const isdevmode = false;

const API_BASE_URL = {
  development: process.env.REACT_APP_BASE_URL,
  production: "",
};

const appConfig = Object.freeze({
  API_BASE_URL: API_BASE_URL[environment],
});

export default appConfig;
