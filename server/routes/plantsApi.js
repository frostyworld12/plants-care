const path = require('path');
const db = require('../../models');
const Op = db.Sequelize.Op;
const router = require('express').Router();
const multer  = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../uploads'))
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  })
});
router.post('/createPlant', upload.single('plantImage'), async (req, res) => {
  try {
    const body = req.body;
    console.log(body.plantData);
    console.log(JSON.parse(body.plantData));

    return res.status(200).json({
      code: 200,
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      code: 400,
      message: error.message || error
    });
  }
});

module.exports = router;