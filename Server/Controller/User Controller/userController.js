const {User} = require('../../Model/User')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()

exports.loginController = async(req, res) =>{

}

exports.signupController = async(req, res)=>{
    const {fullname, email, password} = req.body
    try{
        const user = await User.findOne({email : email})
        if(user){
            return res.status(409).send({message :" User with given details already exist "})
        }else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                fullname : fullname,
                email: email,
                password: hashedPassword
            })
            await newUser.save()
            res.status(201).send({message: "User created successfully!"})
        }
    }catch(err){
        console.log(err);
    }
}