import axios from "axios";
const baseURL = "/api/login";

const create = async (userObject) => {
  console.log(userObject);
  const response = await axios.post(baseURL, userObject);
  return response.data;
};

export default {
  create,
};
