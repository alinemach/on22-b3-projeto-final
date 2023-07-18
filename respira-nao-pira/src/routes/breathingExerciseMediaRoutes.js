const controller = require('../controllers/breathingExerciseMediaController');
const express = require('express');

const router = express.Router();

router.get('/all', controller.findAllMedia);

router.get('/:id', controller.findMediaById);

router.post('/add', controller.addNewMedia);

router.patch('/:id', controller.updateMedia);

router.delete('/:id', controller.deleteMedia);


module.exports = router;