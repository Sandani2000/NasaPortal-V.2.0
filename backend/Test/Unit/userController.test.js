const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../Models/userModel");
const userController = require("../Controllers/userController");

chai.use(chaiHttp);
const expect = chai.expect;

describe("User Controller", () => {
  describe("registerUser", () => {
    it("should register a new user successfully", async () => {
      const req = {
        body: {
          firstName: "John",
          lastName: "Doe",
          emailAddress: "john.doe@example.com",
          password: "password123",
          confirmPassword: "password123",
          role: "user",
        },
      };
      const res = {
        send: sinon.stub().returnsThis(),
        status: sinon.stub().returnsThis(),
      };

      // Stub findOne to return null, indicating user doesn't exist
      sinon.stub(User, "findOne").resolves(null);

      // Stub bcrypt.hash to return hashed password
      sinon.stub(bcrypt, "genSalt").resolves("somesalt");
      sinon.stub(bcrypt, "hash").resolves("hashedpassword");

      // Stub newUser.save to return saved user
      const savedUser = {
        _id: "123456789",
        firstName: "John",
        lastName: "Doe",
        emailAddress: "john.doe@example.com",
        password: "hashedpassword",
        role: "user",
      };
      sinon.stub(User.prototype, "save").resolves(savedUser);

      await userController.registerUser(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith({
        success: true,
        message: "User created successfully, please login",
        user: savedUser,
      })).to.be.true;

      // Restore stubs
      User.findOne.restore();
      bcrypt.genSalt.restore();
      bcrypt.hash.restore();
      User.prototype.save.restore();
    });
  });

  describe("loginUser", () => {
    it("should login a user successfully", async () => {
      const req = {
        body: {
          emailAddress: "john.doe@example.com",
          password: "password123",
        },
      };
      const res = {
        json: sinon.stub(),
      };

      // Stub findOne to return user
      const user = {
        _id: "123456789",
        firstName: "John",
        lastName: "Doe",
        emailAddress: "john.doe@example.com",
        password: "$2a$10$hash", // hashed password
        role: "user",
      };
      sinon.stub(User, "findOne").resolves(user);

      // Stub bcrypt.compare to return true
      sinon.stub(bcrypt, "compare").resolves(true);

      // Stub jwt.sign to return token
      sinon.stub(jwt, "sign").returns("token");

      await userController.loginUser(req, res);

      expect(res.json.calledWith({
        success: true,
        message: "Login successful",
        token: "token",
      })).to.be.true;

      // Restore stubs
      User.findOne.restore();
      bcrypt.compare.restore();
      jwt.sign.restore();
    });
  });
});
