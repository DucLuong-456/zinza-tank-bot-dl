require("dotenv").config();
const io = require("socket.io-client");
const WIDTH = 900;
const HEIGHT = 700;
const TANK_SIZE = 33;
const TILE_SIZE = 20;
const WIDTH_MAP = 45;
const HEIGHT_MAP = 35;
const MOVE_DISTANCE = 3;

const socket = io(process.env.SOCKET_SERVER, {
  auth: { token: process.env.TOKEN },
});

const moveArrow = ["UP", "LEFT", "RIGHT", "DOWN"];
socket.emit("join", {});

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function moveBot(orient, steps) {
  for (let i = 0; i < steps; i++) {
    socket.emit("move", { orient });
    await delay(31);
  }
  await delay(31 * steps);
}

async function shoot() {
  setInterval(() => {
    socket.emit("shoot", {});
  }, 1020);
}

async function startBot() {
  let mapData = null;
  let myBot = null;

  socket.on("user", (data) => {
    mapData = data.map;
    myBot = data.tanks.find((bot) => bot.name === "MonMit");

    if (myBot) {
      socket.on("player_move", (data) => {
        if (data.name === "MonMit") {
          socket.emit("move", {
            orient:
              data.orient === "UP"
                ? "DOWN"
                : data.orient === "DOWN"
                ? "UP"
                : data.orient === "LEFT"
                ? "RIGHT"
                : "LEFT",
          });
        }
        socket.emit("shoot", {});
      });
    }
  });

  await shoot();

  console.log("Bot is starting...");

  const v = 35;

  while (true) {
    await moveBot("UP", v);
    await moveBot("LEFT", v);
    await moveBot("RIGHT", v);
    await moveBot("DOWN", v);
  }
}

startBot();
