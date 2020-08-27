import axios from "axios";
const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const create = (person) => {
  const request = axios.post(baseURL, person);
  return request.then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

export default { getAll, create, remove };
