require("dotenv").config();
const io = require("socket.io-client");

function isObstacle(row, col, map) {
  if (map[row] && map[row][col]) {
    return (
      map[row][col] === "B" || map[row][col] === "W" || map[row][col] === "T"
    );
  }
  return false;
}

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

// Hàm cập nhật vị trí bot khi di chuyển thành công
function moveTank(bot, direction, velocity, map) {
  if (
    !checkCollision(bot.x, bot.y, direction, velocity, map) &&
    bot.orient == "UP"
  ) {
    // Gửi thông tin di chuyển lên server
    socket.emit("move", { orient: direction });
  }
}

const auth = {
  token: process.env.TOKEN,
};

const socket = io(process.env.SOCKET_SERVER, { auth });
socket.emit("join", {});
let mapData = null;
let myBot = null;
const directions = ["UP", "DOWN", "LEFT", "RIGHT"]; // Các hướng di chuyển có thể

socket.on("user", (data) => {
  console.log(data);
  mapData = data.map;
  myBot = data.tanks.find((bot) => bot.name === "Sinbad");
});

// Hàm di chuyển bot ngẫu nhiên
function randomMoveBot() {
  if (mapData && myBot) {
    const randomDirection =
      directions[Math.floor(Math.random() * directions.length)];
    moveTank(myBot, randomDirection, 3, mapData);
  }
}

// Di chuyển bot mỗi 100ms
setInterval(() => {
  randomMoveBot();
}, 52);

// Bắn mỗi 1100ms
setInterval(() => {
  socket.emit("shoot", {});
}, 1100);

function startBot() {
  console.log("Bot is starting...");
}

startBot();
