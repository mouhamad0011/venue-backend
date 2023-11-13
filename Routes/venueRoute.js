const express = require('express');
const router = express.Router();
const controllers = require('../Controllers/venueController');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/add',upload.single('image'), controllers.addVenue);
router.get('/getAll', controllers.getAllVenues);;
router.get('/getOneVenueById/:id', controllers.getOneVenueById);
router.delete('/delete/:id',controllers.deleteVenue);
router.put('/update/:id', controllers.updateVenue);

module.exports = router;