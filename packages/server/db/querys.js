const knex = require("./knex");


function getAllTasks(user_id) {
  return knex("tasks").where({ user_id }).select("*");
}

function addTask(task) {
  return knex("tasks").insert(task).returning("id");
}

function deleteTask(id) {
  return knex("tasks").where({ id }).del();
}

function editTask(id, updates) {
  return knex("tasks").where({ id }).update(updates);
}

function sortByDateCreated(order = "asc") {
  return knex("tasks").select("*").orderBy("created_at", order);
}

function sortByDueDate(order = "asc") {
  return knex("tasks").select("*").orderBy("due_date", order);
}

function sortByPriority(order = "asc") {
  return knex("tasks").select("*").orderBy("priority", order);
}


function newUser(newUser) {
  return knex("users").insert(newUser).returning("id");
}

function getUserByUsername(user_name) {
  return knex("users").where({ user_name }).first();
}


module.exports = {
  getAllTasks,
  addTask,
  deleteTask,
  editTask,
  sortByDateCreated,
  sortByDueDate,
  sortByPriority,
  newUser,
  getUserByUsername,
  
};
