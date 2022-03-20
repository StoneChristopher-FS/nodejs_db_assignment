const http = require("http");
require("dotenv").config();

http.createServer().listen(process.env.port || 3000, () => {
    console.log(`Server running on port: ${process.env.port}`);
});