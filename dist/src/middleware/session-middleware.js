var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Session = require('../persistence/sessions');
const sessionMiddleware = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
    if (!request.session.id) {
        return response.sendStatus(401);
    }
    try {
        // eslint-disable-next-line unicorn/no-fn-reference-in-iterator
        const session = yield Session.find(request.session.id);
        if (!session) {
            request.session.id = null;
            return response.sendStatus(401);
        }
        request.userId = session.userId;
        next();
    }
    catch (error) {
        console.error(`SessionMiddleware(${request.session.id}) >> Error: ${error.stack}`);
        return response.sendStatus(500);
    }
});
module.exports = sessionMiddleware;
//# sourceMappingURL=session-middleware.js.map