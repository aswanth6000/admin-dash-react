const express = require('express');
const router = express.Router()
const userController = require('../../Controller/User Controller/userController')
const multerConfig = require('../../Config/multer')

router.post('/signup', userController.signupController)
router.post('/login', userController.login)
router.post('/updateprofile/:userId', updateProfile = multerConfig.single('profilePic'), userController.updateProfile)



module.exports  = router