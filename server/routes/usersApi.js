const path = require('path');
const db = require('../../models');
const Op = db.Sequelize.Op;
const router = require('express').Router();
const multer = require('multer');

const sendEmail = require('../helpers/sendEmails');

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

module.exports = router;