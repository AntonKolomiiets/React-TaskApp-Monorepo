const knex = require('knex');

const connectedKnex = knex({
  client: "sqlite3",
  connection: {
    filename: "todolist.sqlite3",
  },
  useNullAsDefault: true
});

module.exports = connectedKnex;

