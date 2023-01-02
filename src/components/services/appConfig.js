export const environment = "production"; // THIS LINE NEED to be updated through "production" or "development"

const API_BASE_URL = {
  development: process.env.REACT_APP_DEV_URL,
  production: process.env.REACT_APP_PROD_URL,
};

const appConfig = Object.freeze({
  API_BASE_URL: API_BASE_URL[environment],
});

export default appConfig;
