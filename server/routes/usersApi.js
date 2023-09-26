const db = require('../../models');
const Op = db.Sequelize.Op;
const router = require('express').Router();

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

    if(!user) {
      throw new Error('Incorrect email or password!');
    }

    res.status(200).json({
      code: 200,
      user: user[0]
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