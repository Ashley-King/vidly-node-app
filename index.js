// for env vars
require('dotenv').config()

//dependencies
const express = require('express');
const app = express();
//DEBUG=app:startup nodemon index.js
const debug = require('debug')('app:startup');
const config = require('config');
const helmet = require('helmet')
const morgan = require('morgan')
const genres = require('./routes/genres')





//settings
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/genres', genres);
// use morgan in dev environment
if(app.get('env') === 'development'){
  app.use(morgan('tiny'));
  debug('Morgan enabled - Dev')
}






//port configuration
const port = process.env.PORT || 3000;
console.log("App Name: " + config.get('name'));
//listen up here
app.listen(port, () => console.log(`Server is serving on port ${port}`));

