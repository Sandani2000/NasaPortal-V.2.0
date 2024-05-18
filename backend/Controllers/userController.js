const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const userController = {
  registerUser: async (req, res) => {
    try {
      const user = await User.findOne({ emailAddress: req.body.emailAddress });

      if (user) {
        return res.send({
          success: false,
          message: "Email already exists",
        });
      }

      if (req.body.password !== req.body.confirmPassword) {
        return res.send({
          success: false,
          message: "Passwords do not match",
        });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Create a new user instance with hashed password
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        password: hashedPassword,
        role: req.body.role,
      });

      // Save the new user to the database
      const savedUser = await newUser.save();

      return res.send({
        success: true,
        message: "User created successfully, please login",
        user: savedUser,
      });
    } catch (error) {
      return res.send({
        success: false,
        message: error.message,
      });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { emailAddress, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ emailAddress });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User does not exist",
        });
      }

      // Check if password is correct
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({
          success: false,
          message: "Invalid password",
        });
      }

      // create and assign a token
      const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
        expiresIn: "1d",
      });

      return res.json({
        success: true,
        message: "Login successful",
        token: token,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById({ _id: req.params.userId });
      if (!user) {
        return res.send({
          success: false,
          message: "User does not exist",
        });
      }
      return res.send({
        success: true,
        message: "User data fetched successfully",
        user: user,
      });
    } catch {
      return res.send({
        success: false,
        message: "User does not exist",
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { firstName, lastName, emailAddress, password, role } = req.body;
      const { id } = req.params;
      const updateUser = await User.findByIdAndUpdate(
        id,
        { firstName, lastName, emailAddress, password, role },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "User updated successfully", user: updateUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userToDelete = await User.findById(req.params.id);

      if (!userToDelete) {
        return res.status(404).json({
          success: false,
          message: "User does not exist",
        });
      }

      await User.findByIdAndDelete(req.params.id);

      return res.json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      return res.json({
        success: true,
        message: "Users retrieved successfully",
        data: users,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

module.exports = userController;
