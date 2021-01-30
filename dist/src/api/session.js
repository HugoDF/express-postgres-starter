var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Router } = require('express');
const bcrypt = require('bcrypt');
const User = require('../persistence/users');
const Session = require('../persistence/sessions');
const sessionMiddleware = require('../middleware/session-middleware');
const router = new Router();
router.post('/', (request, response) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        // eslint-disable-next-line unicorn/no-fn-reference-in-iterator
        const user = yield User.find(email);
        if (!user || !(yield bcrypt.compare(password, user.password))) {
            return response.status(403).json({});
        }
        const sessionId = yield Session.create(user.id);
        request.session.id = sessionId;
        response.status(201).json();
    }
    catch (error) {
        console.error(`POST session ({ email: ${request.body.email} }) >> ${error.stack})`);
        response.status(500).json();
    }
}));
router.get('/', sessionMiddleware, (request, response) => {
    response.json({ userId: request.userId });
});
router.delete('/', (request, response) => __awaiter(this, void 0, void 0, function* () {
    try {
        if (request.session.id) {
            yield Session.delete(request.session.id);
        }
        request.session.id = null;
        response.status(200).json();
    }
    catch (error) {
        console.error(`DELETE session >> ${error.stack}`);
        response.status(500).json();
    }
}));
module.exports = router;
//# sourceMappingURL=session.js.map