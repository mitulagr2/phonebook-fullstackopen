const Person = require("../models/person");

const getPersons = (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((err) => next(err));
};

module.exports = getPersons;
