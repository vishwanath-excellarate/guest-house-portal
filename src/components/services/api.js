import axios from "axios";

export function post(apiBaseURL, location, body) {
  return axios
    .post(`${apiBaseURL}${location}`, body)
    .then((response) => {
      return { error: null, response };
    })
    .catch((error) => {
      if (error.response) {
        return { error: error.response };
      }
    });
}

export function put(apiBaseURL, location, body) {
  return axios
    .put(`${apiBaseURL}${location}`, body)
    .then((response) => {
      return { error: null, response };
    })
    .catch((error) => {
      if (error.response) {
        return { error: error.response };
      }
    });
}

export function get(apiBaseURL, location) {
  const url = `${apiBaseURL}${location}`;
  return axios
    .get(`${url}`)
    .then((response) => {
      return { error: null, response };
    })
    .catch((error) => {
      if (error.response) {
        return { error: error.response };
      }
      return error;
    });
}

export function deleteMethod(apiBaseURL, location) {
  const url = `${apiBaseURL}${location}`;

  return axios
    .delete(`${url}`)
    .then((response) => {
      return { error: null, response };
    })
    .catch((error) => {
      if (error.response) {
        return { error: error.response };
      }
      return error;
    });
}

export function remove(apiBaseURL, location, id) {
  return axios
    .delete(`${apiBaseURL}${location}/${id}`)
    .then((response) => {
      return { error: null, response };
    })
    .catch((error) => {
      if (error.response) {
        return { error: error.response };
      }
      return error;
    });
}

// export function setAuthHeaders(headerConfig) {
//   axios.defaults.headers.common.secret = headerConfig.secret;
//   axios.defaults.headers.common.devMode = headerConfig.devMode;
//   axios.defaults.headers.common.location = headerConfig.location || "";
// }
