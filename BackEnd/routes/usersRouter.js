const  express = require('express');
const usersRouter = express.Router();
const usersCtrl = require('../controllers/Users');
const isAuthenticated = require('../middlewares/isAuth');


usersRouter.post('/api/v1/users/register', usersCtrl.register);
usersRouter.post('/api/v1/users/login', usersCtrl.login);
usersRouter.get('/api/v1/users/profile', isAuthenticated, usersCtrl.profile);

module.exports = usersRouter