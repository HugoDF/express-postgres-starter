var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const sql = require('sql-template-strings');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const db = require('./db');
module.exports = {
    create(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield bcrypt.hash(password, 10);
                const { rows } = yield db.query(sql `
      INSERT INTO users (id, email, password)
        VALUES (${uuidv4()}, ${email}, ${hashedPassword})
        RETURNING id, email;
      `);
                const [user] = rows;
                return user;
            }
            catch (error) {
                if (error.constraint === 'users_email_key') {
                    return null;
                }
                throw error;
            }
        });
    },
    find(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db.query(sql `
    SELECT * FROM users WHERE email=${email} LIMIT 1;
    `);
            return rows[0];
        });
    }
};
//# sourceMappingURL=users.js.map