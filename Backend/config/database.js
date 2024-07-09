const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('task_manager_db', 'root', 'Pass1234$', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
