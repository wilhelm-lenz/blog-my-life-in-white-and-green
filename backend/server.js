const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 3067;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => console.log(`Server run on ${HOST}:${PORT}`));
