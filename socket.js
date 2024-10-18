require("dotenv").config();
const io = require("socket.io-client");

// Kiểm tra có vật cản (brick, water, tree)
function isObstacle(row, col, map) {
  if (map[row] && map[row][col]) {
    return (
      map[row][col] === "B" || map[row][col] === "W" || map[row][col] === "T"
    );
  }
  return false;
}

// Kiểm tra va chạm
function checkCollision(x, y, direction, velocity, map) {
  let nextX = x;
  let nextY = y;

  if (direction === "UP") {
    nextY = y - velocity;
    if (
      isObstacle(Math.floor(nextY / 20), Math.floor(x / 20), map) ||
      isObstacle(Math.floor(nextY / 20), Math.floor((x + 33) / 20), map)
    ) {
      return true;
    }
  } else if (direction === "DOWN") {
    nextY = y + velocity + 33;
    if (
      isObstacle(Math.floor(nextY / 20), Math.floor(x / 20), map) ||
      isObstacle(Math.floor(nextY / 20), Math.floor((x + 33) / 20), map)
    ) {
      return true;
    }
  } else if (direction === "LEFT") {
    nextX = x - velocity;
    if (
      isObstacle(Math.floor(y / 20), Math.floor(nextX / 20), map) ||
      isObstacle(Math.floor((y + 33) / 20), Math.floor(nextX / 20), map)
    ) {
      return true;
    }
  } else if (direction === "RIGHT") {
    nextX = x + velocity + 33;
    if (
      isObstacle(Math.floor(y / 20), Math.floor(nextX / 20), map) ||
      isObstacle(Math.floor((y + 33) / 20), Math.floor(nextX / 20), map)
    ) {
      return true;
    }
  }

  return false;
}

function moveTank(x, y, direction, velocity, map, bot) {
  if (
    !checkCollision(x, y, direction, velocity, map) &&
    bot.name !== "MonMit"
  ) {
    if (direction == "UP") direction = "DOWN";
    if (direction == "DOWN") direction = "UP";
    if (direction == "RIGHT") direction = "LEFT";
    if (direction == "LEFT") direction = "RIGHT";
    console.log(direction);

    socket.emit("move", { orient: direction });
  }
}

const auth = {
  token: process.env.TOKEN,
};

const socket = io(process.env.SOCKET_SERVER, { auth });

socket.emit("join", {});
let mapData = null;

socket.on("user", (data) => {
  mapData = data.map;
});

socket.on("player_move", (bot) => {
  if (mapData && bot) {
    moveTank(bot.x, bot.y, bot.orient, 3, mapData, bot);
  }
});

setInterval(() => {
  socket.emit("shoot", {});
}, 1100);

function startBot() {
  console.log("Bot is starting...");
}

startBot();
