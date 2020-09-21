import axios from "axios";
const baseUrl = "/api/blogs";

let token;
const setToken = (tokenObject) => {
  token = tokenObject;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (blog) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const update = async (blog) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, create, setToken, update, remove };
