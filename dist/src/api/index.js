"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const express = require('express');
const express_1 = __importDefault(require("express"));
//const {Router} = express;
//const app = express();
const router = express_1.default.Router();
const user = require('./user');
//const session = require('./session');
router.get('/test', (request, response) => {
    console.log('test342357d');
    return response.status(200)
        .json({ message: 'paresh' });
});
router.use('/api/users', user);
//router.use('/api/sessions', session);
//module.exports = router;
exports.default = router;
//# sourceMappingURL=index.js.map