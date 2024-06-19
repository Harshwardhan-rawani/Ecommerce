const express =require("express")
const routes =express.Router()
const bcrypt = require('bcryptjs');
const user = require("../model/signup")
const jwt = require('jsonwebtoken');
routes.post("/",async(req,res)=>{
  try {
    const {email , pass} = req.body
    const data = await user.findOne({email})
    const Matchpass = bcrypt.compare(data.pass,pass)
    if(data){
    const token = jwt.sign({ id: data._id }, process.env.Jwt_token, {
        expiresIn: '1h'
    });
    
    res.status(201).json({ token ,message:"Successfully Login"});
  }
  else{
    return res.status(404).json({message:"User Not found"})
  }
  }
catch (error) {
    console.log("error")
  }


})

module.exports = routes