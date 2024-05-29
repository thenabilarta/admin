const express = require("express");
const path = require("path");

const app = express();
const httpServer = require("http").createServer(app);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/dist/index.html"))
);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`)
);
