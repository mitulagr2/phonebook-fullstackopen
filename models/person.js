const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;
const numberRegex = /(^\d{8,}$)|(^\d{2,3}-\d+$)/;

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("error connecting to MongoDB:", err.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, "Person's name is too short!"],
    required: [true, "Person's name is required!"],
  },
  number: {
    type: String,
    validate: {
      validator: (v) => numberRegex.test(v),
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "Person's phone number required!"],
  },
  date: Date,
  id: Number,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.date;
  },
});

module.exports = mongoose.model("Person", personSchema);
