const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

morgan.token("tiny_plus", (tokens, req, res) => {
  let method = tokens.method(req, res);
  return [
    method,
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    method === "POST" ? JSON.stringify(req.body) : "",
  ].join(" ");
});

app.use(cors());
app.use(express.json());
app.use(morgan("tiny_plus"));
app.use(express.static("build"));

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "Liisa Marttinen",
    number: "040-243563",
    id: 5,
  },
];

app.get("/info", (req, res) => {
  res.send(`
    <p> Phonebook has info for ${persons.length} people </p>
    <p> ${Date()} </p>
  `);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "person's name or number missing",
    });
  }
  for (let person of persons) {
    if (person.name.toLowerCase().includes(body.name.toLowerCase())) {
      return res.status(400).json({
        error: "name must be unique",
      });
    }
  }

  const person = {
    name: body.name,
    number: body.number,
    date: new Date(),
    id: Math.floor(Math.random() * 100000),
  };

  persons = persons.concat(person);

  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
