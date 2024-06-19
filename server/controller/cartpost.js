const cart = require("../model/cartpost.js")
const jwt = require("jsonwebtoken")
const postcart = async(req,res)=>{
try {

  const {user_id,product_id, quantity,price,image,title }= req.body
  const data = await cart.findOne({user_id,product_id})
  if(!data){
   cart.create({user_id,product_id, quantity,price, image ,title })

     res.status(201).json({message:"Added Successfully"})
  }
 else{
  res.status(404).json({message:"Already Added"})
 }
}
 catch (error) {
  console.log("error in cartpost")
}  

}
const getcart=async(req,res)=>{
  try {
    const token = req.header('Authorization').replace("Bearer ","");
    const decoded = jwt.verify(token,process.env.Jwt_token)
  
      const data = await cart.find({user_id:decoded.id})
     res.status(200).json(data)
  } catch (error) {
    res.status(404).json({message : "error on get cart"})
  }

}
const putcart = async(req,res)=>{

  try{
  const token = req.header('Authorization').replace("Bearer ","");
  const decoded = jwt.verify(token,process.env.Jwt_token)
  const a=await cart.findOneAndUpdate({user_id : decoded.id,product_id:req.body.id},{$set:{quantity:req.body.quantity}},{new :true})
  res.status(200).json({message:"successfull"})
  }
  catch{
    console.log("error")
    res.status(404).json({message : "Not added"})
  }


}


const cartdel = async(req,res)=>{
       const token = req.header("Authorization").replace("Bearer ","")
       const decode = jwt.verify(token,process.env.Jwt_token);
       await cart.findOneAndDelete({user_id : decode.id,product_id:req.params.id})
   
    
}

module.exports = {postcart,getcart,putcart,cartdel}