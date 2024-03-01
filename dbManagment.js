const mysql = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events');
const mysqldump = require('mysqldump');
const cron = require('cron');

const USERNAME = 'root';
const PASSWORD = 'SafetyLika07SafetyKlepan';
const HOST = 'localhost';
const DATABASE = 'plantscare';

const getDbJournal = async (events) => {
  const connection = mysql.createConnection({
    host: HOST,
    user: USERNAME,
    password: PASSWORD
  });

  const instance = new MySQLEvents(connection, {
    startAtEnd: false
  });

  instance.addTrigger({
    name: DATABASE,
    expression: 'plantscare.*',
    statement: MySQLEvents.STATEMENTS.ALL,
    onEvent: event => {
      events.push(event);
    }
  });

  await instance.start();
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