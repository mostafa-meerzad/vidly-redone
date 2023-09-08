const express = require("express");
const { Rental, validate } = require("../models/rental");
const { customer, Customer } = require("../models/customer");
const { Movie } = require("../models/movies");

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await Rental.find().sort("-date");
  res.send(result);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("invalid customer");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("invalid movie");

  if (movie.numberInStock === 0)
    return res.status(400).send("movie not in stock");

  let rental = new Rental({
    customer: {
      _id: customer.id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie.id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  // ---------------------------------
  // there is a problem, we have two operations that need to be completed together
  // if something goes wrong after completing the first operation we will have incorrect data in the database.
  // solution: use transaction (doesn't exist in nonrelational database) instead we have (two stage commit) to
  // achieve the same result.

  rental = await rental.save();
  movie.numberInStock--;

  movie.save();

  res.send(rental);
  //------------------------------
});

module.exports = router;
