var db = require('../db');

module.exports = {
  get: function (req, res) {
    db.Ticket.findAll()
    .then(function(tickets) {
      res.json(tickets);
    })
  },
  post: function (req, res) {
    db.Ticket.findOrCreate(
      {
        where:
        {
          name: req.body.name,
          group: req.body.group,
          comp: req.body.comp,
          rush: req.body.rush,
          stage: req.body.stage,
          date: req.body.date,
          date2: req.body.date2
        }
      })
    .then(function(ticket) {
      //console.log(req.body.name, 'req');
      res.sendStatus(201);
    });
  }
};