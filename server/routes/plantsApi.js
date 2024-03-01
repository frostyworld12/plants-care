const path = require('path');
const db = require('../../models');
const Op = db.Sequelize.Op;
const router = require('express').Router();
const multer = require('multer');

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
router.post('/processPlant', upload.single('plantImage'), async (req, res) => {
  try {
    const file = req.file;

    const body = req.body;
    const plantData = JSON.parse(body.plantData);
    console.log(plantData);

    let plantId;
    await db.sequelize.transaction(async (transaction) => {
      await db.sequelize.query('SET @newPlantId = null;', {transaction});
      await db.sequelize.query('CALL createPlant(@newPlantId, :plantId, :plantName, :plantOrigin, :plantDescription, :plantImage);', {
        transaction,
        replacements: {
          plantId: plantData.id || null,
          plantName: plantData.name,
          plantOrigin: plantData.origin,
          plantDescription: plantData.description,
          plantImage: file ? `/assets/${file.originalname}` : plantData.imageUrl
        },
      });
      const newPlantId = await db.sequelize.query(`SELECT @newPlantId as 'plantId';`, {
        transaction,
        type: db.Sequelize.QueryTypes.SELECT,
        raw: true,
        plain: true
      });

      plantId = newPlantId.plantId;
    });

    if (!plantId) {
      throw new Error('Could not process plant');
    }

    if (plantData.plantCare) {
      await db.sequelize.query('CALL createPlantCare(:plantCareId, :plantId, :plantCareData)', {
        replacements: {
          plantCareId: plantData.plantCare.id || null,
          plantId: plantId,
          plantCareData: plantData.plantCare ? JSON.stringify(plantData.plantCare.operations) : ''
        }
      });
    }

    if (plantData.plantType) {
      await db.sequelize.query('CALL createPlantType(:plantTypeId, :plantId, :plantTypeName)', {
        replacements: {
          plantTypeId: plantData.plantType.id || null,
          plantId: plantId,
          plantTypeName: plantData.plantType.name
        }
      });
    }

    return res.status(200).json({
      code: 200,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      code: 400,
      message: error.message || error
    });
  }
});

router.get('/getPlantsList', async (req, res) => {
  try {
    const params = req.query;

    let queryParams = '';
    if (params.name) {
      queryParams = ` WHERE Plants.name LIKE '%${params.name}%' `;
    }

    const plants = await db.sequelize.query(
      `SELECT Plants.id, Plants.name, Plants.description, Plants.origin, Plants.imageUrl, Plants.createdAt as 'createdAt',
        PlantTypes.id as 'plantTypeId', PlantTypes.name as 'plantType',
        PlantCares.id as 'plantCareId', PlantCares.operations as 'plantCareOperations'
      FROM Plants
      LEFT JOIN PlantTypes ON Plants.plantTypeId = PlantTypes.id
      LEFT JOIN PlantCares ON Plants.plantCareId = PlantCares.id
      ${queryParams}
      ORDER BY createdAt DESC`,
      {
        type: db.Sequelize.QueryTypes.SELECT,
        raw: true
      }
    );

    const plantsTypes = await db.PlantType.findAll({
      attributes: ['id', 'name'],
      raw: true
    });

    return res.status(200).json({
      code: 200,
      plants: plants,
      plantsTypes: plantsTypes
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      code: 400,
      message: error.message || error
    });
  }
});

router.delete('/deletePlant', async (req, res) => {
  try {
    const { plantId, isUserPlant } = req.query;

    console.log(plantId, isUserPlant);

    const table = JSON.parse(isUserPlant) ? db.UserPlant : db.Plant;
    await table.destroy({
      where: {
        id: plantId
      }
    });

    return res.status(200).json({
      code: 200,
    });
  } catch (error) {

    console.log(error);

    return res.status(400).json({
      code: 400,
      message: error.message || error
    });
  }
})

router.post('/addPlantToUserCatalog', async (req, res) => {
  try {
    const plantData = req.body;
    console.log(plantData);

    if (!plantData.userId || !plantData.plantId) {
      throw new Error('Not enough info provided!');
    }

    await db.UserPlant.create({
      userId: plantData.userId,
      plantId: plantData.plantId
    });

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

router.get('/getUserPlantsList', async (req, res) => {
  try {
    const userId = req.query.userId;
    let whereCondition = `WHERE userId = '${userId}'`;

    if (req.query.name) {
      whereCondition += ` AND userPlantName LIKE '%${req.query.name}%' OR name LIKE '%${req.query.name}%'`;
    }

    const plants = await db.sequelize.query(
      `SELECT * FROM userplantslist ${whereCondition}`,
      {
        type: db.Sequelize.QueryTypes.SELECT,
        raw: true
      }
    );

    return res.status(200).json({
      code: 200,
      plants: plants
    });

  } catch (error) {
    return res.status(400).json({
      code: 400,
      message: error.message || error
    });
  }
});

router.post('/changeUserPlantName', async (req, res) => {
  try {
    const plantData = req.body;

    console.log(plantData)

    if (!plantData.userPlantId || !plantData.name) {
      throw new Error('Not enough info provided!');
    }

    await db.UserPlant.update({name: plantData.name}, {
      where: {
        id: plantData.userPlantId
      }
    });

    return res.status(200).json({
      code: 200,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      code: 400,
      message: error.message || error
    });
  }
});

router.post('/createRequest', async (req, res) => {
  try {
    const requestData = req.body;

    if (!requestData.plantId || !requestData.userId || !requestData.description) {
      throw new Error('Not enough info provided!');
    }

    const userRequestType = await db.UserRequestType.findOne({
      where: {
        name: 'In review'
      },
      attributes: ['id'],
      raw: true
    });

    if (!userRequestType) {
      throw new Error('Colud not create request!');
    }

    await db.UserRequest.create({
      plantId: requestData.plantId,
      userId: requestData.userId,
      description: requestData.description,
      userRequestTypeId: userRequestType.id,
      requestStatus: 'In review'
    });

    return res.status(200).json({
      code: 200,
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