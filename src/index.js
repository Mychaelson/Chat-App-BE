const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT;

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const { ppid } = require("process");

// the global allows the use of this object anywhere in the program
const io = new Server(server, { cors: { origin: "*" } });
global.io = io;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Socket API");
});

const { sequelize } = require("./lib/sequelize");
sequelize.sync({ alter: true });

app.use("/user", require("./routes/user"));
app.use("/auth", require("./routes/auth"));
// app.use("/chat", chatRouter);

server.listen(PORT, () => {
  console.log("Listening in Port", PORT);
});
