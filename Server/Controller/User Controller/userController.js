const {User} = require('../../Model/User')
const bcrypt = require('bcrypt')
const express = require('express')
const cloudinary = require('../../Config/cloudinary')
const router = express.Router()
const multer = require('multer')
require('dotenv').config()

const storage = multer.memoryStorage();
const upload = multer({ storage });



exports.signupController = async(req, res)=>{
    console.log(req.body);
    const {fullname, email, password} = req.body
    try{
        const user = await User.findOne({email : email})
        if(!user){
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                fullname : fullname,
                email: email,
                password: hashedPassword
            })
            await newUser.save()
            res.status(201).send({message: "User created successfully!"})
        }else{
            res.status(409).send({message :" User with given details already exist "})
            return;
        }
    }catch(err){
        console.log(err);
    }
}

exports.login = async (req, res)=>{
    const {email, password} = req.body;
    adminEmail = process.env.ADMIN_EMAIL;
    adminPass = process.env.ADMIN_PASSWORD
    try {
        if(email === adminEmail && password === adminPass){
            const users = await User.find()
            const data = {
                adminEmail,
                users
            }
            res.status(201).send({data, message :"Admin login successfully"})
        }else{
            const user = await User.findOne({ email: email });
		if (!user)
			return res.status(401).send({ message: "User not found" });

		const validPassword = await bcrypt.compare(
			password,
			user.password
		);
		if (!validPassword)
        return res.status(401).send({ message: "Invalid Password" });
    
    const token = user.generateAuthToken();
    const data = {
        token,
        user
    }
    console.log(data);
    res.status(200).send({ data, message: "logged in successfully" });
    
}
} catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
}
}

exports.updateProfile = async (req, res) => {
    try {
      const userId = req.params.userId;
      console.log(userId);
      const updatedData = req.body;
      const folderName = 'admin-user-react';
  
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, { public_id: `${folderName}/${req.file.originalname}` });
        updatedData.profilePic = result.secure_url;
      }
  
      const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
      res.json(user);
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  
  exports.getAllUsers =  async (req, res) => {
    try {
      const users = await User.find();
  
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  exports.deleteUser = async (req, res)=>{
    const userId = req.params.userId
    try{
        const user = await User.findByIdAndDelete(userId);
        await user.save()
    }catch(err){
        console.log(err);
    }
  }
