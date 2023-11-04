const {User} = require('../../Model/User')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()



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
		res.status(200).send({ data: token, message: "logged in successfully" });

	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
}