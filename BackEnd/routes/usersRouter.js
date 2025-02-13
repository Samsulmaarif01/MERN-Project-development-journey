const  express = require('express');
const usersRouter = express.Router();
const usersCtrl = require('../controllers/Users');

usersRouter.post('/api/v1/users/register', usersCtrl.register);
usersRouter.post('/api/v1/users/login', usersCtrl.login);

module.exports = usersRouter