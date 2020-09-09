<<<<<<< HEAD
const http = require("http");
const app = require("./app");
=======
const app = require("./app");
const http = require("http");
>>>>>>> parent of fc9dd9c... user
const config = require("./utils/config");

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
