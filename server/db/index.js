var Sequelize = require('sequelize');
var heroku = require('../config/config.js');
// using connection uri for connecting to MySQL ClearDB
var db = new Sequelize(heroku.HEROKU_MYSQL_URI);

// defining models using js, instead of a schema file
var Ticket = db.define('Ticket', {
  name: Sequelize.STRING,
  group: Sequelize.BOOLEAN,
  comp: Sequelize.BOOLEAN,
  rush: Sequelize.BOOLEAN
});

var Studio = db.define('Studio', {
  name: Sequelize.STRING,
  img: Sequelize.STRING
});

Ticket.belongsTo(Studio);

Studio.hasMany(Ticket);


Studio.sync();
Ticket.sync();

exports.Studio = Studio;
exports.Ticket = Ticket;