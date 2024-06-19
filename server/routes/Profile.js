const express = require("express")
const routes = express.Router()
const jwt = require("jsonwebtoken")
const users = require("../model/signup")
routes.get("/",async(req,res)=>{
    
    
    try {
        const token = req.header('Authorization').replace("Bearer ","");
        const decoded = jwt.verify(token,process.env.Jwt_token);
        const user = await users.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
      
        res.status(401).json({ message: 'Invalid or expired token' });
    }
})

module.exports = routes