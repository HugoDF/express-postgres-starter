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
const db = require('./db');
const ensureMigrationsTable = (db) => db.query('CREATE TABLE IF NOT EXISTS migrations (id integer PRIMARY KEY, data jsonb NOT NULL)');
const postgresStateStorage = {
    load(fn) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db.connect();
            yield ensureMigrationsTable(db);
            // Load the single row of migration data from the database
            const { rows } = yield db.query('SELECT data FROM migrations');
            if (rows.length !== 1) {
                console.log('Cannot read migrations from database. If this is the first time you run migrations, then this is normal.');
                return fn(null, {});
            }
            // Call callback with new migration data object
            fn(null, rows[0].data);
        });
    },
    save(set, fn) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db.connect();
            // Check if table 'migrations' exists and if not, create it.
            yield ensureMigrationsTable(db);
            const migrationMetaData = {
                lastRun: set.lastRun,
                migrations: set.migrations
            };
            yield db.query(sql `
      INSERT INTO migrations (id, data)
      VALUES (1, ${migrationMetaData})
      ON CONFLICT (id) DO UPDATE SET data = ${migrationMetaData}
    `);
            fn();
        });
    }
};
module.exports = Object.assign(() => {
    return postgresStateStorage;
}, postgresStateStorage);
//# sourceMappingURL=postgres-state-storage.js.map