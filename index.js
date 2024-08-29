const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 3500;
app.use(cors());

const server = http.createServer(Server);

const io = new Server(server, {
  cors: {
    origin: "http://192.168.1.14:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    console.log(data);
    socket.broadcast.emit("received_message", data);
  });
});

server.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
