const mysql = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events');

const USERNAME = 'root';
const PASSWORD = 'admin';
const HOST = 'localhost';
const DATABASE = 'plantscare';

const getDbJournal = async (events) => {
  const connection = mysql.createConnection({
    host: HOST,
    user: USERNAME,
    password: PASSWORD
  });

  const instance = new MySQLEvents(connection, {
    startAtEnd: false,
    excludedSchemas: {
      mysql: true,
      world: true,
      sakila: true
    },
  });

  instance.addTrigger({
    name: DATABASE,
    expression: `*.${DATABASE}`,
    statement: MySQLEvents.STATEMENTS.ALL,
    onEvent: event => {
      console.log('DB MANAGMENT', event)
      events.push(event);
    }
  });

  await instance.start();

  instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
  instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
}

getDbJournal();