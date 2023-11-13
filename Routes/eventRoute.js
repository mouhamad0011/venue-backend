const express = require('express');
const router = express.Router();
const controllers = require('../Controllers/eventController');

router.post('/add', controllers.addEvent);
router.get('/getAll', controllers.getAllEvents);;
router.get('/getOneEventById/:id', controllers.getOneEventById);
router.delete('/delete/:id',controllers.deleteEvent);
router.put('/update/:id', controllers.updateEvent);

module.exports = router;