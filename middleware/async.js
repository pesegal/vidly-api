// return a function that express can call.
module.export = function asyncMiddleware(handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        }
        catch(ex) {
            next(ex);
        }
    }
}