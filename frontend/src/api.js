// import axios from "axios";

// const BASE_URL = "http://localhost:8080/api/matrix";

// const handleResponse = async (promise) => {
//   try {
//     const res = await promise;
//     return res.data;
//   } catch (err) {
//     const msg =
//       err.response?.data?.message ||
//       err.response?.data ||
//       "Backend connection failed";
//     throw new Error(msg);
//   }
// };

// export const submitMatrix = (data) =>
//   handleResponse(axios.post(`${BASE_URL}/submit`, data));

// export const getTrace = (data) =>
//   handleResponse(axios.post(`${BASE_URL}/trace`, data));

// export const getDeterminant = (data) =>
//   handleResponse(axios.post(`${BASE_URL}/determinant`, data));

// export const getTranspose = (data) =>
//   handleResponse(axios.post(`${BASE_URL}/transpose`, data));

// export const getRank = (data) =>
//   handleResponse(axios.post(`${BASE_URL}/rank`, data));

// export const getInverse = (data) =>
//   handleResponse(axios.post(`${BASE_URL}/inverse`, data));

// export const getAdjoint = (data) =>
//   handleResponse(axios.post(`${BASE_URL}/adjoint`, data));

// export const getSpaces = (data) =>
//   handleResponse(axios.post(`${BASE_URL}/spaces`, data));

// export const getRow = (data) =>
//   handleResponse(axios.post(`${BASE_URL}/row`, data));

// export const getColumn = (data) =>
//   handleResponse(axios.post(`${BASE_URL}/column`, data));

// export const getEigen = (data) =>
//   handleResponse(axios.post(`${BASE_URL}/eigen`, data));

// export const getSubMatrix = (data) =>
//   handleResponse(axios.post(`${BASE_URL}/submatrix`, data));

// /* ===== MATRIX MULTIPLICATION ===== */
// export const multiplyMatrices = (data) =>
//   handleResponse(axios.post(`${BASE_URL}/multiply`, data));


// export const getPartitionMatrix = (d) => 
//   handleResponse(axios.post(`${BASE_URL}/partition`, d));


import axios from "axios";

const BASE_URL = "http://localhost:8080/api/matrix";

const handleResponse = async (promise) => {
  const res = await promise;
  return res.data;
};

export const submitMatrix = (d) => handleResponse(axios.post(`${BASE_URL}/submit`, d));
export const getTrace = (d) => handleResponse(axios.post(`${BASE_URL}/trace`, d));
export const getDeterminant = (d) => handleResponse(axios.post(`${BASE_URL}/determinant`, d));
export const getTranspose = (d) => handleResponse(axios.post(`${BASE_URL}/transpose`, d));
export const getRank = (d) => handleResponse(axios.post(`${BASE_URL}/rank`, d));
export const getInverse = (d) => handleResponse(axios.post(`${BASE_URL}/inverse`, d));
export const getAdjoint = (d) => handleResponse(axios.post(`${BASE_URL}/adjoint`, d));
export const getSpaces = (d) => handleResponse(axios.post(`${BASE_URL}/spaces`, d));
export const getEigen = (d) => handleResponse(axios.post(`${BASE_URL}/eigen`, d));
export const getSubMatrix = (d) => handleResponse(axios.post(`${BASE_URL}/submatrix`, d));
export const multiplyMatrices = (d) => handleResponse(axios.post(`${BASE_URL}/multiply`, d));

// UPDATED: Support multiple indices/splits
export const getRow = (d) => handleResponse(axios.post(`${BASE_URL}/rows`, d));
export const getColumn = (d) => handleResponse(axios.post(`${BASE_URL}/columns`, d));
export const getPartitionMatrix = (d) => handleResponse(axios.post(`${BASE_URL}/partition`, d));