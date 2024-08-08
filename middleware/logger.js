const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logFlieName) => {
  const dataTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${dataTime}\t${uuid()}\t${message}\n`;

  try {
    const logDir = path.join(__dirname, "..", "/logs");
    if (!fs.existsSync(logDir)) {
      await fsPromises.mkdir(logDir);
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "/logs", logFlieName),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};

// Middleware Function
const logger = (req, res, next) => {
  if (req.url !== "/favicon.ico") {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
    console.log(`${req.method}  ${req.path}`);
  }
  next();
};

module.exports = { logEvents, logger };
