const  express = require('express');
const usersRouter = express.Router();
const usersCtrl = require('../controllers/Users');

usersRouter.post('/api/v1/users/register', usersCtrl.register);

module.exports = usersRouter