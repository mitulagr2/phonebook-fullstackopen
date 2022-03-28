const Person = require("../models/person");

const getInfo = (req, res, next) => {
  Person.count()
    .then((count) => {
      res.send(`
      <p> Phonebook has info for ${count} people </p>
      <p> ${Date()} </p>
    `);
    })
    .catch((err) => next(err));
};

module.exports = getInfo;
