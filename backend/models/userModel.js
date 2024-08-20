const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  designation: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false, // Default value for admin status
  },
  subAdmin: {
    type: Boolean,
    default: false,
  }
});

// static signup method
userSchema.statics.signup = async function (
  name,
  designation,
  email,
  password,
  admin = false,
  subAdmin = false
) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, designation, email, password: hash, admin, subAdmin });

  return user;
};

// static signup method
userSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

// src/models/userModel.js

userSchema.statics.changePassword = async function (userId, currentPassword, newPassword) {
  // Validate inputs
  if (!currentPassword || !newPassword) {
    throw Error("All fields must be filled");
  }

  if (!validator.isStrongPassword(newPassword)) {
    throw Error("New password not strong enough");
  }

  const user = await this.findById(userId);
  if (!user) {
    throw Error("User not found");
  }

  const match = await bcrypt.compare(currentPassword, user.password);
  if (!match) {
    throw Error("Current password is incorrect");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(newPassword, salt);

  user.password = hash;
  await user.save();

  return user;
};


module.exports = mongoose.model("User", userSchema);

