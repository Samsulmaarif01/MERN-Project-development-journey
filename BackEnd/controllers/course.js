const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Course = require("../models/Course"); 

const courseCtrl = {
  create: asyncHandler(async (req, res) => {
    const { title, description, difficulty, duration } = req.body;
    console.log(req.user);

    // Find user by ID
    const userFound = await User.findById(req.user);
    if (!userFound) {
      res.status(404);
      throw new Error("User not found");
    }

    // Validate input fields
    if (!title || !description || !difficulty || !duration) {
      res.status(400);
      throw new Error("Please provide all fields");
    }

    // Check if the course already exists
    const courseFound = await Course.findOne({ title });
    if (courseFound) {
      res.status(400);
      throw new Error("Course already exists");
    }

    // Create a new course
    const courseCreated = await Course.create({
      title,
      description,
      difficulty,
      duration,
      user: req.user,
    });

    // Add course to user's created courses list
    if (!userFound.coursesCreated) {
      userFound.coursesCreated = [];
    }
    userFound.coursesCreated.push(courseCreated._id);

    // Save updated user data
    await userFound.save();

    // Send response to the client
    res.json(courseCreated);
  }),
};

module.exports = courseCtrl;
