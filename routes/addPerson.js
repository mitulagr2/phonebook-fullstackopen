const Person = require("../models/person");

const addPerson = (req, res, next) => {
  const { name, number } = req.body;
  const person = new Person({
    name: name,
    number: number,
    date: new Date(),
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((err) => next(err));
};

module.exports = addPerson;
