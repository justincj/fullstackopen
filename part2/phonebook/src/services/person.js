import axios from "axios";
const baseURL = "/api/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const create = (person) => {
  const request = axios.post(baseURL, person);
  return request.then((response) => response.data);
};

const update = (id, updateObject) => {
  const request = axios.put(`${baseURL}/${id}`, updateObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

export default { getAll, create, remove, update };
