const log = require("../logging/logger");

function logMiddleware(req, res, next) {
    log.info(`Anfrage erhalten: ${req.method} ${req.originalUrl}`);
    next();
}

module.exports = logMiddleware;