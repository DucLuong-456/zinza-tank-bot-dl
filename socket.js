require("dotenv").config();
const io = require("socket.io-client");
const WIDTH = 900; // Bản đồ 900px
const HEIGHT = 700; // Bản đồ 700px
const TANK_SIZE = 33; // Xe tăng 33x33
const TILE_SIZE = 20; // Mỗi ô gạch 20x20
const WIDTH_MAP = 45;
const HEIGHT_MAP = 35;
const MOVE_DISTANCE = 3;
const socket = io(process.env.SOCKET_SERVER, {
  auth: { token: process.env.TOKEN },
});

const moveDirector = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};

const moveArrow = ["UP", "RIGHT", "DOWN", "LEFT"];
socket.emit("join", {});

let mapData = null;
let myBot = null;

const isCheckObstacle = (mapItem) => {
  return mapItem == "B" || mapItem == "T" || mapItem == "W";
};

socket.on("user", (data) => {
  mapData = data.map;
  myBot = data.tanks.find((bot) => bot.name === "Sinbad");

  if (!myBot) {
    console.log("my bot doest not exist!");
  } else {
    console.log(myBot);
    nextX = myBot.x;
    nextY = myBot.y;
  }
  for (let index = 0; index < 4; index++) {
    setInterval(() => {
      socket.emit("move", { orient: moveArrow[index] });
    }, 31);
  }
});

setInterval(() => {
  socket.emit("shoot", {});
}, 1100);

function startBot() {
  console.log("Bot is starting...");
}

startBot();
