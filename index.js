const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const users = require('./server/routes/usersApi');
const plants = require('./server/routes/plantsApi');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/users', users);
app.use('/plants', plants);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});