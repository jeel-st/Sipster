const log = require("../logging/logger");

/**
 * Middleware-Funktion, die bei jeder Anfrage aufgerufen wird und die Methode sowie die URL der Anfrage protokolliert.
 * 
 * @param req: Object -> Die Anfrage
 * @param res: Object -> Die Antwort
 * @param next: Function -> Nächste Middleware-Funktion im Stapel
 */

function logMiddleware(req, res, next) {
    log.info(`Anfrage erhalten: ${req.method} ${req.originalUrl}`);
    next();
}


module.exports = logMiddleware;