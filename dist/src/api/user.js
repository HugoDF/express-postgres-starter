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
const User = require('../persistence/users');
const router = new Router();
router.post('/', (request, response) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response
                .status(400)
                .json({ message: 'email and password must be provided' });
        }
        const user = yield User.create(email, password);
        if (!user) {
            return response.status(400).json({ message: 'User already exists' });
        }
        return response.status(200).json(user);
    }
    catch (error) {
        console.error(`createUser({ email: ${request.body.email} }) >> Error: ${error.stack}`);
        response.status(500).json();
    }
}));
module.exports = router;
//# sourceMappingURL=user.js.map