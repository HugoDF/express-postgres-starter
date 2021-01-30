'use strict'
const db = require('../persistence/db');

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
    CREATE TABLE IF NOT EXISTS catalogue_category (
      catalogue_category_id uuid PRIMARY KEY,
      name text
    );
  `);

  await client.release(true);
  next()
}

module.exports.down = async function (next) {
  const client = await db.connect();

  await client.query(`
  DROP TABLE catalogue_category;
  `);
  next()
}
