const Person = require("../models/person");

const deletePerson = (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => next(err));
};

module.exports = deletePerson;
