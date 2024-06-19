const jwt = require("jsonwebtoken");
const user = require("../model/signup")
const bcrypt = require('bcryptjs');
async function postsignup (req,res){
 try{
const data = req.body
const validemail = await user.findOne({email : data.email})
const validphone = await user.findOne({Phone : data.phone})

if(!validemail && !validphone){
  const hashpassword =await bcrypt.hash(data.password,10)
await user.create({
  username: data.username,
  email: data.email,
  pass: hashpassword, 
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
const postForgot = async(req,res)=>{
  try{
  const {email,password,confirm_password}=req.body

  const hashpassword = await bcrypt.hash(password,10)
  const data = await user.findOneAndUpdate({email},{$set:{pass:hashpassword}},{new : true})
 
  if(data){
      if(!data) return res.status(404).json({message:"Enter valid Mail"})
      return res.status(200).json({message: "Successfully Updated"})
  }
  console.log("User Have not logged In")
  return res.status(404).json({message: "User Have not logged In"})
}
catch(error){
  console.log("Request argument is wrong",error)
  return res.status(404).json({message:"Request Argument is wrong"})
}

}
module.exports = { postsignup ,postForgot}