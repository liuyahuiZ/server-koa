let dbName = "jfintech_hk";
let user = 'root';
let pass = 'MyNewPass4!'
let dbHost = "192.168.1.121";
// let dbHost = 'mongodb://192.168.1.139:27017/';
const Sequelize = require('sequelize');
exports.mysqlConnect = function(request, response) {
  const sequelize = new Sequelize(dbName, user, pass, {
    host: dbHost,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  });

  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
}