const pino = require("pino");
const fs = require("fs");

const streams = [
  {
    level: "info", // log info and above
    stream: fs.createWriteStream("./logging/app.log", { flags: "a" }),
  },
  {
    level: "error", // log error and above
    stream: fs.createWriteStream("./logging/error.log", { flags: "a" }),
  },
];

module.exports = pino(
  {
    level: "info",
  },
  pino.multistream(streams)
);