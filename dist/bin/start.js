"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const Server = require('../server');
const server_1 = __importDefault(require("../server"));
server_1.default.start(process.env.PORT);
//# sourceMappingURL=start.js.map