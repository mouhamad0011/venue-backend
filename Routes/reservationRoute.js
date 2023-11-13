const express = require('express');
const router = express.Router();
const controllers = require('../Controllers/reservationController');

router.post('/add', controllers.addReservation);
router.get('/getAll', controllers.getAllReservations);;
router.get('/getOneReservationById/:id', controllers.getOneReservationById);
router.get('/getReservationsByEventId/:id', controllers.getReservationsByEventId);
router.get('/getReservationsByUserId/:id', controllers.getReservationsByUserId);
router.get('/getFullNameTitleDate', controllers.getFullNameTitleDate);
router.delete('/delete/:id',controllers.deleteReservation);
router.put('/update/:id', controllers.updateReservation);

module.exports = router;