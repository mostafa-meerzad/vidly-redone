const { Movie, validate } = require("../models/movies");
const { Genre } = require("../models/genre");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies =  await Movie.find().sort("name")
  res.send(movies)
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("invalid genre");

  const movie = new Movie({
    title: req.body.title,
    genre: { _id: genre.id, name: genre.name }, // here genre is not set to genre that is found above because in a
    //more complex app it would have too many properties that we actually don't need all of it here, select and add
    // those properties that you need here
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  const result = await movie.save()
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findOne({ _id: req.params.id });

  if (!movie) return res.status(400).send("no such movie");

  res.send(movie);
});

router.put("/:id", async (req, res) => {
  // todo
  // check the user input
  // if not ok return error
  // look up for the movie and update
  // if not found return error

  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findOneAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      numberInStock: req.body.numberInStock,
      dailyRate: req.body.dailyRentalRate,
    }
  );

  if (!movie) return res.status(400).send("no such movie");
  // movie.up

  res.send(movie);
});


router.delete("/:id", async (req, res)=>{
    const movie =await Movie.findOneAndDelete({_id:req.body.id})
    if(!movie) return res.status(404).send("no such movie exist in the database")

})

module.exports = router;
