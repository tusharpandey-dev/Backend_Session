const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const logPath = path.join(__dirname, "..", "access.log");

// create write stream
const stream = fs.createWriteStream(logPath, { flags: "a" });

// custom log format
const format =
  ":method :url :status :res[content-length] - :response-time ms :date[clf] HTTP/:http-version";

module.exports = morgan(format, { stream });
