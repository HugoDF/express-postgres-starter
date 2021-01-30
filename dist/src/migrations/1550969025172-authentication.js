var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const db = require('../persistence/db');
module.exports.up = function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield db.connect();
        yield client.query(`
  CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY,
    email text UNIQUE,
    password text
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id uuid PRIMARY KEY,
    user_id uuid REFERENCES users (id) ON DELETE CASCADE
  );
  `);
        yield client.query(`
  CREATE INDEX users_email on users (email);

  CREATE INDEX sessions_user on sessions (user_id);
  `);
        yield client.release(true);
        next();
    });
};
module.exports.down = function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield db.connect();
        yield client.query(`
  DROP TABLE sessions;
  DROP TABLE users;
  `);
        yield client.release(true);
        next();
    });
};
//# sourceMappingURL=1550969025172-authentication.js.map