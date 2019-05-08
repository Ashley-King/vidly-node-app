// for env vars
require('dotenv').config()

//initialize express
const express = require('express');
const app = express();
//configure port for main server
const port = process.env.PORT || 3000;








//listen up here
app.listen(port, () => console.log(`Server is serving on port ${port}`));

