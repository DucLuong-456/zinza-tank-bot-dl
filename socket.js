require("dotenv").config();
const io = require("socket.io-client");

const auth = {
  token: process.env.TOKEN,
};

const socket = io(process.env.SOCKET_SERVER, { auth: auth });

socket.emit("join", {});
socket.on("user", (data) => {
  console.log(data);
  const myBot = data.tanks.find((tank) => {
    return tank.name == "Sinbad";
  });
});
setInterval(() => {
  socket.emit("move", { orient: "UP" });
}, 1000);

setInterval(() => {
  socket.emit("shoot", {});
}, 1200);
