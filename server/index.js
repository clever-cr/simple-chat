import express from "express";
import http from "http";
import server from "socket.io";
import cors from "cors";

app.use(cors());
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: " http://localhost:5173/",
  },
});
