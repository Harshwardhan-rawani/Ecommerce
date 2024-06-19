const jwt = require("jsonwebtoken");
const user = require("../model/signup")
const bcrypt = require('bcryptjs');
async function postsignup (req,res){
 try{
const data = req.body
console.log(data)
const validemail = await user.findOne({email : data.email})
const validphone = await user.findOne({Phone : data.phone})
if(!validemail && !validphone){
user.create({
  username: data.username,
  email: data.email,
  pass: data.password, 
  Phone: data.phone,
})
const token = jwt.sign({ id: data._id }, process.env.Jwt_token,{ expiresIn: '1h'})
return res.status(200).json({message:"Successfully Register",token})
}
return res.status(404).json({message:"This User Already exist"})
 }
 catch(error){
  console.log(error)
 }
}

module.exports = { postsignup ,}