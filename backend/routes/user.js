const express = require('express')
const requireAuth = require('../middleware/requireAuth');
//controller functions 

const { signupUser, loginUser, changePassword } = require('../controllers/userController')

const router = express.Router()

//login route
router.post('/login', loginUser)

//signup route 
router.post('/signup', signupUser)

// Protected routes
router.post('/change-password', requireAuth, changePassword);

module.exports = router