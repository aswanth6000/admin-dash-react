const express = require('express');
const router = express.Router()
const userController = require('../../Controller/User Controller/userController')

router.post('/signup', userController.signupController)
router.post('/login', userController.login)



module.exports  = router