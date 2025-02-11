const { UserModel } = require("../model/User");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const signup=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const user=await UserModel.findOne({email})
        if(user){
            return res.status(400).json({message:"User already exists",success:false})
        }
        const hashPassword=await bcrypt.hash(password,10)
        const newUser=new UserModel({name,email,password:hashPassword})
        await newUser.save()
        res.status(200).json({message:"User created successfully",success:true})

    }catch(err){
        console.log(err);
        res.status(500).json({message:"internal server error",success:false})
    }
}
const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({message:"User already exists",success:false})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(403).json({
                message:"Invalid password",
            })
        }
        const jwtToken=jwt.sign(
            {email:user.email,_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}


        )
        res.status(200).
        json({
            message:"User loggedin successfully",
            success:true,
            jwtToken,
            email,
            name:user.name
        })

    }catch(err){
        console.log(err);
        res.status(500).json({message:"internal server error",success:false})
    }
}

module.exports={signup,login}