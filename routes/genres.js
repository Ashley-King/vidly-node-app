const express = require('express');
const router = express.Router();
const validateName = require('../middleware/validateName')

// error status message
const error404Message = "That one ain't here, yo."
// create genres
const genres = [
 {
  id: 1,
  name: 'horror'
 },
 {
  id: 2,
  name: 'action/adventure'
 },
 {
  id: 3,
  name: 'comedy'
 },
 {
  id: 4,
  name: 'drama'
 },
 {
  id: 5,
  name: 'romance'
 },
 {
  id: 6,
  name: 'science fiction'
 },
 {
  id: 7,
  name: 'western'
 },
 {
  id: 8,
  name: 'mystery'
 },
 {
  id: 9,
  name: 'historical fiction'
 },
 {
  id: 10,
  name: 'thriller'
 },
 
];


//get list of genres
router.get('/', (req,res) => {
 if(typeof genres === 'undefined' || genres.length === 0) return res.status(404).send(`${error404Message}`); 
 res.send(genres);
})

//get a single genre
router.get('/:id', (req, res) => {
 const genreId = parseInt(req.params.id);
 const genre = genres.find(g => g.id === genreId);
 if(!genre) return res.status(404).send(`${error404Message}`);
 res.send(genre);
 res.end();
})

// create a genre
router.post('/', (req, res) => {
 const lastId = genres[genres.length -1].id;
 
  const result = validateName(req.body);
  
  if(result.error) return res.status(400).send(result.error.details[0].message);
  const newGenre = {
   id: lastId + 1,
   name: req.body.name,
  }
  
  genres.push(newGenre);
  res.send(newGenre);
  res.end();

})

//update a genre
router.put('/:id', (req, res) => {
 const oldGenreId = parseInt(req.params.id);
 const genre = genres.find(g => g.id === oldGenreId);
 if(typeof genre === 'undefined'){
  return res.status(404).send("That one ain't here, yo.")
 }
 const result = validateName(req.body);
 if(result.error) return res.status(400).send(result.error.details[0].message);
 
  genre.name = req.body.name
  res.send(genre);
  res.end();

})//put 

// delete genre
router.delete('/:id', (req, res) => {
 const genre = genres.find(g => g.id === parseInt(req.params.id));
 if(typeof genre === 'undefined') return res.status(404).send(`${error404Message}`);
 const genreIndex = genres.indexOf(genre);
 genres.splice(genreIndex, 1);
 res.send(genre);
})


module.exports = router;