const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

const users     = require('./server/routes/usersApi');
const plants    = require('./server/routes/plantsApi');
const userTasks = require('./server/routes/userTasks');

// const db = require('./models');
// db.sequelize.sync({ alter: true })
//     .then(() => console.log('Database synced!'))
//     .catch(e => console.log(e));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/users' , users);
app.use('/plants', plants);
app.use('/tasks' , userTasks);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});