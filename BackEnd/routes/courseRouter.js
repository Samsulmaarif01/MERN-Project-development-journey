const  express = require('express');
const courseRouter = express.Router();
const isAuthenticated = require('../middlewares/isAuth');
const courseCtrl = require('../controllers/course');

courseRouter.post('/api/v1/courses/create', isAuthenticated, courseCtrl.create);


module.exports = courseRouter