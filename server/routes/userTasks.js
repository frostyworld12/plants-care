const path = require('path');
const db = require('../../models');
const Op = db.Sequelize.Op;
const router = require('express').Router();

router.get('/getUserTasks', async (req, res) => {
  try {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    const userTasks = await db.UserTasks.findAll({
      where: {
        [Op.and]: [{
          operationDate: {[Op.gte]: startDate}
        }, {
          operationDate: {[Op.lte]: endDate}
        }]
      },
      raw: true
    });

    return res.status(200).json({
      code: 200,
      userTasks: userTasks
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      message: error.message || error
    });
  }
});

router.post('/getTasksDescription', async (req, res) => {
  try {
    let tasksIds = req.body.tasksIds;

    if (!tasksIds) {
      throw new Error('Not enough info provided!');
    }

    tasksIds = tasksIds.map(taskId => `'${taskId}'`);

    const tasks = await db.sequelize.query(
      `SELECT * FROM gettasksdescription WHERE id IN (${tasksIds})`,
      {
        type: db.Sequelize.QueryTypes.SELECT,
        raw: true
      }
    );

    return res.status(200).json({
      code: 200,
      tasks: tasks
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      code: 400,
      message: error.message || error
    });
  }
});

module.exports = router;