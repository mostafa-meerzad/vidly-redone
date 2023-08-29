const express = require("express");
const Joi = require("joi");

const app = express();

const genres = [
  { id: 1, genre: "genre 1" },
  { id: 2, genre: "genre 2" },
  { id: 3, genre: "genre 3" },
  { id: 4, genre: "genre 4" },
  { id: 5, genre: "genre 5" },
];

app.use(express.json());

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  // Todo
  // look up for the genre
  // return 404 if genre not exits
  // return the course
  const genre = genres.find((g) => parseInt(req.params.id) === g.id);
  if (!genre) return res.status(404).send("no such genre");
  res.send(genre);
});

app.post("/api/genres", (req, res) => {
  // Todo
  // check provided data
  // if ok construct new genre with provided data
  // add new genre to the collection
  // return the new genre
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    genre: req.body.genre,
  };

  genres.push(genre);
  res.send(genre);
});

app.put("/api/genres/:id", (req, res) => {
  // Todo
  // look up for the genre
  // check the genre existence
  // if exists update the selected genre
  // return the updated genre
  const genre = genres.find((g) => parseInt(req.params.id) === g.id);

  if (!genre) return res.status(404).send("no such genre");

  const { error } = validateGenre(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  genre.genre = req.body.genre;

  res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
  // Todo
  // look up for the genre
  // if not exist return proper error
  // delete the genre
  // return deleted genre
  const genre = genres.find((g) => parseInt(req.params.id) === g.id);

  if (!genre) return res.status(404).send("no genre with provided id");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server listening on port: ${port}`))


function validateGenre(genre) {
  const schema = Joi.object({
    genre: Joi.string().required().min(5),
  });
  return schema.validate(genre);
}
