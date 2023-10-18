const db = require('../../models');
const Op = db.Sequelize.Op;
const router = require('express').Router();

const sendEmail = require('../helpers/sendEmails');

router.post('/createUser', async (req, res) => {

});

router.get('/authUser', async (req, res) => {
  try {
    const userInfo = req.query;
    if (!userInfo.email || !userInfo.password) {
      throw new Error('Not enough info provided!');
    }

    const user = await db.sequelize.query(
      `SELECT Users.id, Users.email, Users.firstName, Users.lastName, UserTypes.name as 'userType' FROM Users ` +
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

    console.log(user);

    await db.sequelize.query('CALL processUser(:userId, :firstName, :lastName, :userTypeId, :password)', {
      replacements: {
        userId: user.id || null,
        firstName: user.firstName,
        lastName: user.lastName,
        userTypeId: '',
        password: ''
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

module.exports = router;