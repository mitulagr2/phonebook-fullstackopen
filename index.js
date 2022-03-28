require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const unknownEndpoint = require("./middleware/noEndpoint");
const customFormat = require("./utils/morganCustom");
const morgan = require("morgan");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(morgan(customFormat));

app.get("/info", require("./routes/getInfo"));
app.get("/api/persons", require("./routes/getPersons"));
app.get("/api/persons/:id", require("./routes/getPerson"));
app.post("/api/persons", require("./routes/addPerson"));
app.put("/api/persons/:id", require("./routes/updatePerson"));
app.delete("/api/persons/:id", require("./routes/deletePerson"));

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
