const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth")
const {validate, Genre} = require("../models/genre");
const admin = require("../middlewares/admin")
router.get("/", async (req, res) => {
  // const genres = genres.concat()
  // console.log("main route");
  const genres = await Genre.find();
  console.log(genres)
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  // Todo
  // look up for the genre
  // return 404 if genre not exits
  // return the course
  // const genre = genres.find((g) => parseInt(req.params.id) === g.id);
  const genre = await Genre.findOne({ _id: req.params.id }, { new: true });
  if (!genre) return res.status(404).send("no such genre");
  res.send(genre);
});

router.post("/", auth, async (req, res) => {
  // Todo
  // check provided data
  // if ok construct new genre with provided data
  // add new genre to the collection
  // return the new genre
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // const genre = {
  //   id: genres.length + 1,
  //   genre: req.body.genre,
  // };
  const genre = await Genre({ name: req.body.name });
  const result = await genre.save()
  // genres.push(genre);
  res.send(result);
});

router.put("/:id", async (req, res) => {
  // Todo
  // look up for the genre
  // check the genre existence
  // if exists update the selected genre
  // return the updated genre
  // const genre = genres.find((g) => parseInt(req.params.id) === g.id);

  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const genre =await Genre.findOneAndUpdate(
    { _id: req.params.id },
    { name: req.body.name },
    { new: true }
  );

  if (!genre) return res.status(404).send("no such genre");

  // genre.genre = req.body.genre;

  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  // Todo
  // look up for the genre
  // if not exist return proper error
  // delete the genre
  // return deleted genre
  // const genre = genres.find((g) => parseInt(req.params.id) === g.id);

try{
  const genre = await Genre.findOneAndRemove({ _id: req.params.id });

 
  // const index = genres.indexOf(genre);
  // genres.splice(index, 1);
  res.send(genre);
}
catch(err){
  // console.log(err)
 res.status(404).send("no genre with provided id");

}
});



module.exports = router;
