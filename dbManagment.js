const mysql = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events');
const mysqldump = require('mysqldump');
const cron = require('cron');

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
      sakila: true,
      jira_schema: true
    },
  });

  await instance.start();

  instance.addTrigger({
    name: DATABASE,
    expression: `*.${DATABASE}`,
    statement: MySQLEvents.STATEMENTS.ALL,
    onEvent: event => {
      console.log('DB MANAGMENT', event)
      events.push(event);
    }
  });

  // instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
  // instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
}

const createDbBackup = async () => {
  const dumpFileName = `dbDumps/${Math.round(Date.now() / 1000)}.dump.sql`;

  await mysqldump({
    connection: {
      host: HOST,
      user: USERNAME,
      password: PASSWORD,
      database: DATABASE,
    },
    dumpToFile: dumpFileName,
  });

  return dumpFileName;
}

const scheduleDatabaseBackup = async () => {
  new cron.CronJob(
    '* 1 * * * *',
    async () => await createDbBackup(),
    null,
    true
  );
}

module.exports = {
  getDbJournal,
  createDbBackup,
  scheduleDatabaseBackup
};