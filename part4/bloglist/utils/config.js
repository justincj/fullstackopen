require("dotenv").config();

let MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

<<<<<<< HEAD
module.exports = {
  PORT,
  MONGODB_URI,
=======
if (process.env.NODE_ENV === "test") {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}

module.exports = {
  MONGODB_URI,
  PORT,
>>>>>>> parent of fc9dd9c... user
};
