const express = require('express');
const router = express.Router()
const userController = require('../../Controller/User Controller/userController')
const multerConfig = require('../../Config/multer')


router.get('/getallusers', userController.getAllUsers)
router.post('/signup', userController.signupController)
router.post('/login', userController.login)
router.post('/updateprofile/:userId', updateProfile = multerConfig.single('profilePic'), userController.updateProfile)
router.post('/deleteuser/:userId', userController.deleteUser)



module.exports  = router