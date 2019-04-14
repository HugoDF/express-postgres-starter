const sql = require('sql-template-strings');
const uuid = require('uuid/v4');
const db = require('./db');

module.exports = {
  async create(userId) {
    const id = uuid();
    await db.query(sql`
    INSERT INTO sessions (id, user_id)
      VALUES (${id}, ${userId});
    `);
    return id;
  },
  async find(id) {
    const {rows} = await db.query(sql`
    SELECT user_id FROM sessions WHERE id = ${id} LIMIT 1;
    `);
    if (rows.length !== 1) {
      return null;
    }

    const {user_id: userId} = rows[0];
    return {userId};
  },
  async delete(id) {
    await db.query(sql`
    DELETE FROM sessions WHERE id = ${id};
    `);
  }
};
