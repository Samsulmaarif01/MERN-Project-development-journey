const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const usersCtrl = {
    // register
    register: asyncHandler(async (req, res) => {
        const { username, email, password } = req.body;
        // const user = await User
        // validate
        if(!username || !email || !password) {
            throw new Error('Please all fields are required');
        }
        // Check if User already exists
        const userExists = await User.findOne({email});
        if(userExists){
            throw new Error('User already exists');
        }
        // Hash the user password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hast(password, salt);
        // Create User
        const userCreated = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        // Send Response
        res.json(userCreated);
    }),
};

module.exports = usersCtrl;