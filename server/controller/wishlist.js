const model = require("../model/wishlist")
const jwt = require("jsonwebtoken")
const postwishlist = async(req,res)=>{
    const data =  req.body
    const token = req.header('Authorization').replace("Bearer ","");
    try {
        const decoded = jwt.verify(token,process.env.Jwt_token)
        const a = await model.findOne({user_id:decoded.id,p_id:data.p_id})
        if(!a){
            await model.create({
                user_id : decoded.id,
                p_id : data.p_id,
                p_price : data.p_price,
                p_title : data.p_title,
                p_image : data.p_image
            })
        }
      
        res.status(200).json({message : "Successfully added"})
    } catch (error) {
        res.status(404).json({message : "not added"})
    }
 
}
const getwishlist = async(req,res)=>{
    try {
        const token = req.header('Authorization').replace("Bearer ","");
        const decoded = jwt.verify(token,process.env.Jwt_token)
        
        const data = await model.find({user_id:decoded.id})
        res.status(200).json(data)
    } catch (error) {
        res.status(404)
    }
}
const deletewishlist = async(req,res)=>{
  
    try {
        const token = req.header('Authorization').replace("Bearer ","");
        const decoded = jwt.verify(token,process.env.Jwt_token)
        const {id}=req.params
        await model.findOneAndDelete({user_id:decoded.id,p_id:id})
    } catch (error) {
        res.status(404).json({message:"notdeleted"})
    }
  
}
module.exports = {postwishlist,getwishlist,deletewishlist}