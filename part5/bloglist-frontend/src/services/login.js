import axios from "axios";

const BASEURL = "http://localhost:3003/api/login";

let token;

const create = async (user) => {
  const response = await axios.post(BASEURL, user);
  token = response.data.token;
  return response.data;
};

export default {
  create,
  token,
};
