const path = require('path');
const db = require('../../models');
const Op = db.Sequelize.Op;
const router = require('express').Router();
const multer = require('multer');
const writeXlsxFile = require('write-excel-file/node');
const fs = require('fs');

const sendEmail = require('../helpers/sendEmails');
const dbManagment = require('../../dbManagment');

router.post('/createUser', async (req, res) => {
  try {
    const user = req.body;

    let errorMessage;
    await db.sequelize.transaction(async (transaction) => {
      await db.sequelize.query(`SET @errorText = '';`, {transaction});
      await db.sequelize.query('CALL createUser(@errorText, :firstName, :lastName, :email, :password);', {
        transaction,
        replacements: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password
        },
      });
      const errorText = await db.sequelize.query(`SELECT @errorText as 'error';`, {
        transaction,
        type: db.Sequelize.QueryTypes.SELECT,
        raw: true,
        plain: true
      });
      errorMessage = errorText.error;
    });

    if (errorMessage) {
      throw new Error(errorMessage);
    }

    return res.status(200).json({
      code: 200
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      code: 400,
      message: error.message || error
    });
  }
});

router.get('/authUser', async (req, res) => {
  try {
    const userInfo = req.query;
    if (!userInfo.email || !userInfo.password) {
      throw new Error('Not enough info provided!');
    }

    const user = await db.sequelize.query(
      `SELECT Users.id, Users.email, Users.firstName, Users.lastName, Users.imageUrl, UserTypes.name as 'userType' FROM Users ` +
      `INNER JOIN UserTypes ON Users.userTypeId = UserTypes.id ` +
      `WHERE Users.email = '${userInfo.email}' AND Users.password = '${userInfo.password}' LIMIT 1`,
      {
        type: db.Sequelize.QueryTypes.SELECT,
        raw: true
      }
    );

    if (user.length === 0) {
      throw new Error('Incorrect email or password!');
    }

    res.status(200).json({
      code: 200,
      user: user[0]
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error.message || error
    });
  }
});

router.post('/processUser', async (req, res) => {
  try {
    const user = req.body.userData;

    if (!user.firstName || !user.lastName || !user.roleId) {
      throw new Error('Not enough info provided!');
    }

    await db.sequelize.query('CALL processUser(:userId, :firstName, :lastName, :email, :userTypeId, :isDelete)', {
      replacements: {
        userId: user.id || null,
        firstName: user.firstName,
        email: user.email,
        lastName: user.lastName,
        userTypeId: user.roleId,
        isDelete: !!user.isDelete
      }
    });

    return res.status(200).json({
      code: 200
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      code: 400,
      message: error?.message || error
    });
  }
});

router.get('/getUsers', async (req, res) => {
  try {
    const users = await db.sequelize.query(
      'SELECT * FROM getusers',
      {
        type: db.Sequelize.QueryTypes.SELECT,
        raw: true
      }
    );

    const userTypes = await db.UserType.findAll();

    res.status(200).json({
      code: 200,
      users: users,
      userTypes: userTypes
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error.message || error
    });
  }
});

router.post('/resetPassword', async (req, res) => {
  try {
    const user = req.body;
    const content = sendEmail.generateResetPasswordTemplate('12345');

    await sendEmail.sendEmail('frostyworld12@gmail.com', 'Reset password', content);

    res.status(200).json({
      code: 200
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: 400,
      message: error.message || error
    });
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../client/src/assets'));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  })
});

router.post('/updateUser', upload.single('avatar'), async (req, res) => {
  try {
    const file = req.file;

    const body = req.body;
    const userData = JSON.parse(body.userData);

    if (!userData.id || !userData.firstName || !userData.lastName) {
      throw new Error('Not enoigh info provided!');
    }

    const user = await db.User.findOne({
      where: {
        id: userData.id
      },
      raw: true
    });

    if (!user) {
      throw new Error('Could not find such user!');
    }

    const userToUpdate = {
      firstName: userData.firstName,
      lastName: userData.lastName
    };

    if (file) {
      userToUpdate.imageUrl = `/assets/${file.originalname}`;
    }

    await db.User.update(userToUpdate, {
      where: {
        id: userData.id
      }
    });

    res.status(200).json({
      code: 200
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: 400,
      message: error.message || error
    });
  }
});

router.get('/getUserRequests', async (req, res) => {
  try {
    const userId = req.query.userId;
    const status = req.query.status;

    if (!userId) {
      throw new Error('Not enough info provided!');
    }

    let statusCondition = '';
    if (status) {
      statusCondition = `AND requestStatus = '${status}'`
    }

    const userRequests = await db.sequelize.query(
      `SELECT * FROM getusersrequests WHERE userId = '${userId}' ${statusCondition}`,
      {
        type: db.Sequelize.QueryTypes.SELECT,
        raw: true
      }
    );

    res.status(200).json({
      code: 200,
      userRequests: userRequests
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: 400,
      message: error.message || error
    });
  }
});

router.get('/getUserRequestsAdmin', async (req, res) => {
  try {
    const status = req.query.status;

    let statusCondition = '';
    if (status) {
      statusCondition = `WHERE requestStatus = '${status}'`
    }

    const userRequestStatuses = await db.UserRequestType.findAll({
      attributes: ['id', 'name'],
      raw: true
    });

    const userRequests = await db.sequelize.query(
      `SELECT * FROM getusersrequests ${statusCondition}`,
      {
        type: db.Sequelize.QueryTypes.SELECT,
        raw: true
      }
    );

    res.status(200).json({
      code: 200,
      result: {
        userRequests: userRequests,
        userRequestStatuses: userRequestStatuses
      }
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error.message || error
    });
  }
});

router.post('/updateUserRequestStatus', async (req, res) => {
  try {
    const request = req.body.request;

    await db.UserRequest.update({
      userRequestTypeId: request.userRequestTypeId
    }, {
      where: {
        id: request.requestId
      }
    });

    res.status(200).json({
      code: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: 400,
      message: error.message || error
    });
  }
});

router.get('/getDBTablesInfo', async (req, res) => {
  try {
    const tablesInfo = await db.sequelize.query(
      `SELECT column_name as 'column', table_name as 'table' FROM information_schema.columns
        WHERE table_schema = 'plantscare' AND table_name != 'sequelizemeta'`,
      {
        type: db.Sequelize.QueryTypes.SELECT,
        raw: true
      }
    ) || [];

    const result = tablesInfo.reduce((result, tableInfo) => {
      if (!result[tableInfo.table]) {
        result[tableInfo.table] = [];
      }

      result[tableInfo.table].push(tableInfo.column);

      return result;
    }, {});

    res.status(200).json({
      code: 200,
      result: result
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error.message || error
    });
  }
});

router.get('/performDatabaseRequest', async (req, res) => {
  try {
    const request = req.query.dbRequest;

    if (!request) {
      throw new Error('Not enough info provided!');
    }

    if (request.toLowerCase().includes('drop') || request.toLowerCase().includes('alter')) {
      throw new Error('You are not allowed to change DB tables!');
    }

    const requestResult = await db.sequelize.query(
      request,
      {
        type: db.Sequelize.QueryTypes.SELECT,
        raw: true
      }
    ) || [];

    res.status(200).json({
      result: requestResult,
      code: 200,
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error.message || error
    });
  }
});

router.get('/downloadDatabaseRequestResult', async (req, res) => {
  try {
    const request = req.query.dbRequest;

    if (!request) {
      throw new Error('Not enough info provided!');
    }

    if (request.toLowerCase().includes('drop') || request.toLowerCase().includes('alter')) {
      throw new Error('You are not allowed to change DB tables!');
    }

    const requestResult = await db.sequelize.query(
      request,
      {
        type: db.Sequelize.QueryTypes.SELECT,
        raw: true
      }
    ) || [];

    if (requestResult.length === 0) {
      res.status(200).json({
        code: 200
      });
    }

    const headerRow = Object.keys(requestResult[0]).map(column => ({ value: column, fontWeight: 'bold' }));
    const bodyRows = [];

    requestResult.forEach(record => {
      const recordData = [];
      Object.keys(record).forEach(column => {
        const currentRecord = {
          type: String,
          value: record[column],
        };

        if (record[column] !== null || record[column] !== '') {
          if (record[column] instanceof Date) {
            currentRecord.type = Date;
            currentRecord.format = 'YYYY-MM-DD';
          } else if (record[column] instanceof Number) {
            currentRecord.type = Number;
            currentRecord.value = JSON.parse(record[column]);
          } else if (record[column] === 0 || record[column] === 1) {
            currentRecord.type = Boolean;
            currentRecord.value = !!record[column];
          }
        }

        recordData.push(currentRecord);
      });

      bodyRows.push(recordData);
    });

    const data = [
      headerRow,
      ...bodyRows
    ];

    const file = await writeXlsxFile(data, {
      sheet: 'DB Data'
    });

    res.set('Content-Disposition', `attachment; filename=DB_Data_${new Date().toISOString()}.xlsx`);
    file.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: 400,
      message: error.message || error
    });
  }
});

router.get('/getDatabaseBackupsList', async (req, res) => {
  try {
    const dumpsFiles = fs.readdirSync(path.join(__dirname, `../../dbDumps`));

    res.status(200).json({
      code: 200,
      dumpsFiles: dumpsFiles
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error.message || error
    });
  }
});

router.get('/downloadDatabaseBackupFile', async (req, res) => {
  try {
    const fileName = req.query.fileName;

    if (!fileName) {
      throw new Error('Not enough info provided!');
    }

    getDatabaseBackupFile(`dbDumps/${fileName}`, res);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: 400,
      message: error.message || error
    });
  }
});

router.get('/startDatabaseBackup', async (req, res) => {
  try {
    await dbManagment.createDbBackup();
    res.status(200).json({
      code: 200,
      message: 'success'
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error.message || error
    });
  }
});

const getDatabaseBackupFile = (filePath,  res) => {
  const file = fs.createReadStream(path.join(__dirname, `../../${filePath}`));
  const fileName = path.basename(filePath);

  file.on('close', () => {
    res.end()
  });

  res.set('Content-Disposition', `attachment; filename=${fileName}`);
  file.pipe(res);
}

module.exports = router;