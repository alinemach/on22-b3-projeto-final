const controller = require('../controllers/symptomsController');
const express = require('express');

const router = express.Router();

router.get("/all", controller.findAllSymptoms);

router.get("/:id", controller.findSymptomById);

router.post("/add", controller.addNewSymptom);

router.patch("/:id", controller.updateSymptom);

router.delete("/:id", controller.deleteSymptom);


module.exports = router;