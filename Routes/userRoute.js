const express = require('express');
const router = express.Router();
const controllers = require('../Controllers/userController');

router.post('/add', controllers.addUser);
router.get('/getAll', controllers.getAllUsers);;
router.get('/getOneUserById/:id', controllers.getOneUserById);
router.post('/getOneUserByEmailPassword',controllers.getOneUserByEmailPassword);
router.delete('/delete/:id',controllers.deleteUser);
router.put('/update/:id', controllers.updateUser);

module.exports = router;