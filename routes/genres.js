const express = require("express");
const router = express.Router();
const { Genre, validate } = require("../models/genre");

// error status message
const error404Message = "That one ain't here, yo.";
// create genres

//get list of genres
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

//get a single genre
router.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    res.send(genre);
  } catch {
    return res.status(404).send(`${error404Message}`);
  }
});

// create a genre
router.post("/", async (req, res) => {
  const result = validate(req.body);

  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

//update a genre
router.put("/:id", async (req, res) => {
  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  try {
    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    ); //get updated obj
    res.send(genre);
  } catch {
    return res.status(404).send(`${error404Message}`);
  }
}); //put

// delete genre
router.delete("/:id", async (req, res) => {
  try {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    res.send(genre);
  } catch {
    res.status(404).send(`${error404Message}`);
  }
});

module.exports = router;
