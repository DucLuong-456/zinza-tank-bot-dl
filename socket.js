// require("dotenv").config();
// const io = require("socket.io-client");

// function isObstacle(row, col, map) {
//   if (map[row] && map[row][col]) {
//     return (
//       map[row][col] === "B" || map[row][col] === "W" || map[row][col] === "T"
//     );
//   }
//   return false;
// }

// function checkCollision(x, y, direction, velocity, map) {
//   let nextX = x;
//   let nextY = y;

//   if (direction === "UP") {
//     nextY = y - velocity;
//     if (
//       isObstacle(Math.floor(nextY / 20), Math.floor(x / 20), map) ||
//       isObstacle(Math.floor(nextY / 20), Math.floor((x + 33) / 20), map)
//     ) {
//       return true;
//     }
//   } else if (direction === "DOWN") {
//     nextY = y + velocity + 33;
//     if (
//       isObstacle(Math.floor(nextY / 20), Math.floor(x / 20), map) ||
//       isObstacle(Math.floor(nextY / 20), Math.floor((x + 33) / 20), map)
//     ) {
//       return true;
//     }
//   } else if (direction === "LEFT") {
//     nextX = x - velocity;
//     if (
//       isObstacle(Math.floor(y / 20), Math.floor(nextX / 20), map) ||
//       isObstacle(Math.floor((y + 33) / 20), Math.floor(nextX / 20), map)
//     ) {
//       return true;
//     }
//   } else if (direction === "RIGHT") {
//     nextX = x + velocity + 33;
//     if (
//       isObstacle(Math.floor(y / 20), Math.floor(nextX / 20), map) ||
//       isObstacle(Math.floor((y + 33) / 20), Math.floor(nextX / 20), map)
//     ) {
//       return true;
//     }
//   }

//   return false;
// }

// // Hàm cập nhật vị trí bot khi di chuyển thành công
// function moveTank(bot, direction, velocity, map) {
//   if (
//     !checkCollision(bot.x, bot.y, direction, velocity, map) &&
//     bot.orient == "UP"
//   ) {
//     // Gửi thông tin di chuyển lên server
//     socket.emit("move", { orient: direction });
//   }
// }

// const auth = {
//   token: process.env.TOKEN,
// };

// const socket = io(process.env.SOCKET_SERVER, { auth });
// socket.emit("join", {});
// let mapData = null;
// let myBot = null;
// const directions = ["UP", "DOWN", "LEFT", "RIGHT"]; // Các hướng di chuyển có thể

// socket.on("user", (data) => {
//   console.log(data);
//   mapData = data.map;
//   myBot = data.tanks.find((bot) => bot.name === "Sinbad");
// });

// // Hàm di chuyển bot ngẫu nhiên
// function randomMoveBot() {
//   if (mapData && myBot) {
//     const randomDirection =
//       directions[Math.floor(Math.random() * directions.length)];
//     moveTank(myBot, randomDirection, 3, mapData);
//   }
// }

// // Di chuyển bot mỗi 100ms
// setInterval(() => {
//   randomMoveBot();
// }, 52);

// // Bắn mỗi 1100ms
// setInterval(() => {
//   socket.emit("shoot", {});
// }, 1100);

// function startBot() {
//   console.log("Bot is starting...");
// }

// startBot();

require("dotenv").config();
const io = require("socket.io-client");
const WIDTH = 900; // Bản đồ 900px
const HEIGHT = 700; // Bản đồ 700px
const TANK_SIZE = 33; // Xe tăng 33x33
const TILE_SIZE = 20; // Mỗi ô gạch 20x20
const WIDTH_MAP = 45;
const HEIGHT_MAP = 35;
const socket = io(process.env.SOCKET_SERVER, {
  auth: { token: process.env.TOKEN },
});

const moveDirector = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};
socket.emit("join", {});

let mapData = null;
let myBot = null;

const isCheckBeak = (mapItem) => {
  return mapItem == "B" || mapItem == "T" || mapItem == "W";
};

socket.on("user", (data) => {
  console.log(data);
  mapData = data.map;
  myBot = data.tanks.find((bot) => bot.name === "Sinbad");
  nextRightX = Math.floor((myBot.x + 4) / 20);
  nextLeftX = Math.floor((myBot.x - 4) / 20);

  nextBottomY = Math.floor((myBot.y - 4) / 20);
  nextTopY = Math.floor((myBot.y + 4) / 20);

  setInterval(() => {
    for (let i = 0; i < 45; i++) {
      for (let j = 0; j < 35; j++) {
        if(mapData[nextTopY] == )
        socket.emit("move", { orient: myBot.orient });
      }
    }
  }, 52);
});

setInterval(() => {
  socket.emit("shoot", {});
}, 1100);

function startBot() {
  console.log("Bot is starting...");
}

startBot();
