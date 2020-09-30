import axios from "axios";
const baseURL = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseURL);
  console.log(response);
  return response.data;
};

const create = async (quoteObject) => {
  const response = await axios.post(baseURL, quoteObject);
  console.log(response);
  return response.data;
};

export default { getAll, create };
