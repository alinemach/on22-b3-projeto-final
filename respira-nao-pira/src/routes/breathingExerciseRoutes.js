const controller = require('../controllers/breathingExerciseController');
const express = require('express');

const router = express.Router();

router.get('/all', controller.findAllBreathingExercise);

router.get('/:id', controller.findBreathingExerciseById);

router.post('/add', controller.addNewBreathingExercise);

router.patch('/:id', controller.updateBreathingExercise);

router.delete('/:id', controller.deleteBreathingExercise);


module.exports = router;