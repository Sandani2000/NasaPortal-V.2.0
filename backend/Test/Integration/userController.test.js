const request = require("supertest");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const { expect } = require("chai");
const sinon = require("sinon");
const userRoutes = require("../routes/userRoutes");
const User = require("../models/userModel");

const app = express();
app.use(bodyParser.json());
app.use("/users", userRoutes);

before(async () => {
  try {
    console.log("Before all tests: Establishing MongoDB connection...");
    await mongoose.connect(process.env.mongo_url_IT);
    await User.deleteMany({});
    console.log("MongoDB connection established.");
  } catch (error) {
    console.error("Error establishing MongoDB connection:", error);
  }
});

after(async () => {
  await User.deleteMany({});
  await mongoose.disconnect();
});

describe("User Integration Tests", () => {
  describe("POST /users/register", () => {
    it("should register a new user", async () => {
      const response = await request(app)
        .post("/users/register")
        .send({
          firstName: "John",
          lastName: "Doe",
          emailAddress: "john@example.com",
          password: "password",
          role: "student",
        })
        .expect(200);

      expect(response.body.success).to.be.true;
      expect(response.body.message).to.equal(
        "User created successfully, please login"
      );
      expect(response.body.user).to.have.property("_id");
      expect(response.body.user).to.have.property("firstName", "John");
      expect(response.body.user).to.have.property("lastName", "Doe");
      expect(response.body.user).to.have.property(
        "emailAddress",
        "john@example.com"
      );
      expect(response.body.user).to.have.property("role", "student");
    });
  });

  describe("POST /users/login", () => {
    it("should login an existing user", async () => {
      await User.create({
        firstName: "Jane",
        lastName: "Doe",
        emailAddress: "jane@example.com",
        password: "password",
        role: "student",
      });

      const response = await request(app)
        .post("/users/login")
        .send({
          emailAddress: "jane@example.com",
          password: "password",
        })
        .expect(200);

      expect(response.body.success).to.be.true;
      expect(response.body.message).to.equal("Login successful");
      expect(response.body).to.have.property("token");
    });
  });

  describe("GET /users/getUserById/:userId", () => {
    it("should get user by ID", async () => {
      const newUser = await User.create({
        firstName: "Alice",
        lastName: "Smith",
        emailAddress: "alice@example.com",
        password: "password",
        role: "student",
      });

      const response = await request(app)
        .get(`/users/getUserById/${newUser._id}`)
        .expect(200);

      expect(response.body.success).to.be.true;
      expect(response.body.message).to.equal("User data fetched successfully");
      expect(response.body.user).to.have.property(
        "_id",
        newUser._id.toString()
      );
      expect(response.body.user).to.have.property("firstName", "Alice");
      expect(response.body.user).to.have.property("lastName", "Smith");
      expect(response.body.user).to.have.property(
        "emailAddress",
        "alice@example.com"
      );
      expect(response.body.user).to.have.property("role", "student");
    });
  });

  describe("PUT /users/update/:id", () => {
    it("should update user details", async () => {
      const newUser = await User.create({
        firstName: "Alice",
        lastName: "Smith",
        emailAddress: "alice@example.com",
        password: "password",
        role: "student",
      });

      const response = await request(app)
        .put(`/users/update/${newUser._id}`)
        .send({
          firstName: "Alice_updated",
          lastName: "Smith_updated",
          emailAddress: "alice_updated@example.com",
          password: "newpassword",
          role: "faculty",
        })
        .expect(200);

      expect(response.body.message).to.equal("User updated successfully");
      expect(response.body.user).to.have.property(
        "_id",
        newUser._id.toString()
      );
      expect(response.body.user).to.have.property("firstName", "Alice_updated");
      expect(response.body.user).to.have.property("lastName", "Smith_updated");
      expect(response.body.user).to.have.property(
        "emailAddress",
        "alice_updated@example.com"
      );
      expect(response.body.user).to.have.property("role", "faculty");
    });
  });

  describe("DELETE /users/:id", () => {
    it("should delete user", async () => {
      const newUser = await User.create({
        firstName: "Alice",
        lastName: "Smith",
        emailAddress: "alice@example.com",
        password: "password",
        role: "student",
      });

      const response = await request(app)
        .delete(`/users/${newUser._id}`)
        .expect(200);

      expect(response.body.success).to.be.true;
      expect(response.body.message).to.equal("User deleted successfully");
    });
  });

  describe("GET /users/getAll", () => {
    it("should retrieve all users", async () => {
      await User.create([
        {
          firstName: "User1",
          lastName: "Lastname1",
          emailAddress: "user1@example.com",
          password: "password",
          role: "student",
        },
        {
          firstName: "User2",
          lastName: "Lastname2",
          emailAddress: "user2@example.com",
          password: "password",
          role: "faculty",
        },
      ]);

      const response = await request(app).get("/users/getAll").expect(200);

      expect(response.body.success).to.be.true;
      expect(response.body.message).to.equal("Users retrieved successfully");
      expect(response.body.data).to.be.an("array");
      expect(response.body.data).to.have.lengthOf(2);
    });
  });
});
