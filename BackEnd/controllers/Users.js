const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const usersCtrl = {
    // !register
    register: asyncHandler( async(req, res) => {
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
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create User
        const userCreated = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        // Send Response
        res.json({
            username: userCreated.name,
            role: userCreated.role,
            email: userCreated.email,
            password: userCreated.password,
            id: userCreated._id,
        });
    }),
    // ! Login
    login: asyncHandler(async(req, res)=>{
        const {email, password} = req.body
        // !Check if user email exists
        const user = await User.findOne({email});
        if(!user){
            throw new Error('Invalid email or password')
        }
        // !Check if user password valid
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            res.status(410);
            throw new Error('Password incorrect');
        }
        // !Generate token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'});
        // !Send response
        res.json({
            message:"Login Succes",
            token,
            // username: user.name,
            // role: user.role,
            email: user.email,
            // password: user.password,
            id: user._id,
        });
    }),
    // ! Profile
    profile: asyncHandler(async(req, res)=>{
        res.json({
            message:"welcome to your profile"
        });
    }),
};


module.exports = usersCtrl;