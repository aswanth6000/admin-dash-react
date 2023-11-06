const {User} = require('../../Model/User')
const bcrypt = require('bcrypt')
const express = require('express')
const cloudinary = require('../../Config/cloudinary')
const router = express.Router()
const multer = require('multer')

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
    try {

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

	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
}

exports.updateProfile = async (req, res)=>{
    const userId = req.params.userId;
    console.log(userId);
    const updatedData = req.body;
    const folderName = 'admin-user-react';
    console.log("ssssssss",updatedData);
    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path,  { public_id: `${folderName}/${req.file.originalname}`});
        updatedData.profilePic = result.secure_url;
        console.log(updatedData);
      }
      const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
      
      res.json(user);
}
