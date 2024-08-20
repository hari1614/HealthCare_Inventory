const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Create token function
const createToken = (_id) => {
  // return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
  return jwt.sign({ _id }, process.env.SECRET);
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // Create a token
    const token = createToken(user._id);

    // Return user details along with the token
    res.status(200).json({ user: { ...user.toObject(), token } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signup a user
const signupUser = async (req, res) => {
  const { name, designation, email, password, admin, subAdmin } = req.body;

  try {
    const user = await User.signup(name, designation, email, password, admin, subAdmin);

    // Create a token
    const token = createToken(user._id);

    // Return user details along with the token
    res.status(200).json({ user: { ...user.toObject(), token } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Change password
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.changePassword(userId, currentPassword, newPassword);
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser, changePassword };
