const express = require('express')
const route = express.Router();
const controller = require('../controller/controllerClient');
const authController = require('../controller/authController')




route.get('/all', controller.findAll);
route.get('/add', controller.addClient);
route.get('/update/:id', controller.updateClient);
route.get('/remove/:id', controller.removeClient);
route.get('/login', authController.user)
route.delete('/remove/:id', controller.removeClient);
route.put('/update/:id', controller.updateClient);
route.post('/add', controller.addClient);


module.exports = route;