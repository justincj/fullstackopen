import axios from "axios";
const baseUrl = "/api/blogs";

let token;

const setToken = (userToken) => {
  token = `Bearer ${userToken}`;
};

const getAll = async () => {
  console.log("request");
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const update = async (blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  return response.data;
};

const remove = async (blogId) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  console.log(config.headers.Authorization);
  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
  console.log(response);
  return response.data;
};

export default { getAll, setToken, create, update, remove };
