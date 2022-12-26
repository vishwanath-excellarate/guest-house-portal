import axios from "axios";
import { getEncryptLocalStorage } from "../constants/utils";

export function post(apiBaseURL, location, body) {
  const token = getEncryptLocalStorage("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios
    .post(`${apiBaseURL}${location}`, body, config)
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
  const token = getEncryptLocalStorage("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const url = `${apiBaseURL}${location}`;
  return axios
    .get(`${url}`, config)
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

export function setAuthHeaders(token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
}
