const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

// Register a new user
router.post("/register", userController.registerUser);

// User login
router.post("/login", userController.loginUser);

//get user by id
router.get("/get/:userId", userController.getUserById);

//update user details
router.put("/update/:id", userController.updateUser);

//delete user
router.delete("delete/:id", userController.deleteUser);

//retrive all users
router.get("/", userController.getAllUsers);

module.exports = router;
