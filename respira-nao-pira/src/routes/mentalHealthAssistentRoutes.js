const express = require('express');
const router = express.Router();

const controller = require('../controllers/mentalHeathAssistentController');

router.post('/add', controller.addNewAssistent);
router.get('/', controller.getAllAssistents);
router.delete('/:id', controller.deleteAssistentById);
router.post('/login', controller.login)


module.exports = router;
