const Person = require("../models/person");

const updatePerson = (req, res, next) => {
  Person.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { number: req.body.number } },
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  )
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((err) => next(err));
};

module.exports = updatePerson;
