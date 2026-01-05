import axios from "axios";

const BASE_URL = "http://localhost:8080/api/matrix";

const handleResponse = async (promise) => {
  try {
    const res = await promise;
    return res.data;
  } catch (err) {
    const msg =
      err.response?.data?.message ||
      err.response?.data ||
      "Backend connection failed";
    throw new Error(msg);
  }
};

export const submitMatrix = (data) =>
  handleResponse(axios.post(`${BASE_URL}/submit`, data));

export const getTrace = (data) =>
  handleResponse(axios.post(`${BASE_URL}/trace`, data));

export const getDeterminant = (data) =>
  handleResponse(axios.post(`${BASE_URL}/determinant`, data));

export const getTranspose = (data) =>
  handleResponse(axios.post(`${BASE_URL}/transpose`, data));

export const getRank = (data) =>
  handleResponse(axios.post(`${BASE_URL}/rank`, data));

export const getInverse = (data) =>
  handleResponse(axios.post(`${BASE_URL}/inverse`, data));

export const getAdjoint = (data) =>
  handleResponse(axios.post(`${BASE_URL}/adjoint`, data));

export const getSpaces = (data) =>
  handleResponse(axios.post(`${BASE_URL}/spaces`, data));

export const getRow = (data) =>
  handleResponse(axios.post(`${BASE_URL}/row`, data));

export const getColumn = (data) =>
  handleResponse(axios.post(`${BASE_URL}/column`, data));
