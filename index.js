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
const dbManagment = require('./dbManagment');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/users' , users);
app.use('/plants', plants);
app.use('/tasks' , userTasks);

// const db = require('./models');
// db.sequelize.sync({ alter: true })
//     .then(() => console.log('Database synced!'))
//     .catch(e => console.log(e));

const events = [];
app.get('/dbLogs/getEvents', (req, res) => {
  try {
    const result = events.map(event => {
      const affectedRows = event.affectedRows[0];
      console.log(affectedRows);


      const affectedRecords = [];
      event.affectedColumns.forEach(column => {
        const affectedRow = {
          column: column,
        };

        if (event.type !== 'INSERT') {
          affectedRow.valueBefore = affectedRows.before[column];
        }

        if (event.type !== 'DELETE') {
          affectedRow.valueAfter = affectedRows.after[column];
        }

        affectedRecords.push(affectedRow);
      });

      return {
        dml: event.type,
        table: event.table,
        time: event.timestamp,
        affectedRows: affectedRecords
      };
    });

    return res.status(200).json({
      code: 200,
      result: result
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      message: error.message || error
    });
  }
});

app.listen(3003, async() => {
  console.log('Server listening on port 3003');
  await dbManagment.getDbJournal(events);
  // dbManagment.scheduleDatabaseBackup();
});