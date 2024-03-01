const path = require('path');
const db = require('../../models');
const Op = db.Sequelize.Op;
const router = require('express').Router();

router.get('/getUserTasks', async (req, res) => {
  try {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const userId = req.query.userId;

    const userTasks = await db.UserTasks.findAll({
      where: {
        operationDate: { [Op.gte]: startDate },
        operationDate: { [Op.lte]: endDate },
        userId: userId
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
    const userId = req.body.userId;

    if (!tasksIds) {
      throw new Error('Not enough info provided!');
    }

    tasksIds = tasksIds.map(taskId => `'${taskId}'`);

    const tasks = await db.sequelize.query(
      `SELECT * FROM gettasksdescription WHERE id IN (${tasksIds}) AND userId = '${userId}'`,
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

router.post('/saveTasks', async(req, res) => {
  try {
    const tasks = req.body.tasks;

    console.log(tasks);

    if (!tasks) {
      throw new Error('Not enough info provided!');
    }

    Object.keys(tasks).forEach(async (taskId) => {
      await db.UserTasks.update({
        isCompleted: tasks[taskId],
      }, {
        where: {
          id: taskId
        }
      });

      await db.UserTasksHistory.update({
        isNewTaskCreated: true,
      }, {
        where: {
          taskId: taskId
        }
      });
    });

    return res.status(200).json({
      message: 'success'
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      message: error.message || error
    });
  }
});

module.exports = router;