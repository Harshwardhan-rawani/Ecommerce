const user =  require("../model/Homeitems.js")


const gethomeitems = async(req,res)=>{
  const item=await user.find()
  
   return res.json(item)
  
}
module.exports = { gethomeitems }