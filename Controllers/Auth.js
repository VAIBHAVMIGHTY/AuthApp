const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.signup = async(req,res)=>{
    try{
        const {name,email,password,role} = req.body;
        const ExistingUser = await User.findOne({email});
        if(ExistingUser){
            return res.status(400).json({message:"Email already exists"});
        }
     let hashedPassword;
     try{
        hashedPassword = await bcrypt.hash(password,10)
     }
     catch{
        return res.status(500).json({message:"Error hashing password"});
     }
     const userr = await User.create({
        name,email,password:hashedPassword,role
     })
     return res.status(201).json({message:"User created successfully",usser:userr})
    }    
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Error creating user"});
    }  
}