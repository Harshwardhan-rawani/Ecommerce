const cart = require("../model/cartpost.js")
const jwt = require("jsonwebtoken");


async function saveUserData(userid, products) {
  try {
      const newUser = new cart({
          user_id: userid,
          products: products,
      });
      await newUser.save();
      console.log('User data saved successfully!');
  } catch (error) {
      console.error('Error saving user data:', error);
      throw error; 
  }
}


const postcart = async(req,res)=>{
try {
  const token = req.header('Authorization').replace("Bearer ","");
  const decoded = jwt.verify(token,process.env.Jwt_token)
  const products= req.body
 
  const user = await cart.findOne({user_id : decoded.id})
  if (!user) {
    await saveUserData(decoded.id, products);
    res.status(200).json({message:"sucess"})
} 
else {
    user.products.push(products);
    await user.save();
    res.status(200).json({message:"sucess"})
}
  
}
 catch (error) {
  console.log("error in cartpost")
  res.status(200).json({message:"Fail on post on cart"})
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
  const data = req.body
  const user = await cart.findOne({user_id:decoded.id})
  if(user){
    const item =  user.products.find(items => items.product_id==data.product_id)
    item.quantity = data.quantity
    await user.save()
  }

  res.status(200).json({message:"successfull"})
  }
  catch{
    console.log("error")
    res.status(404).json({message : "Not added"})
  }


}


const cartdel = async (req, res) => {
  try {
      const token = req.header('Authorization').replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.Jwt_token);
      const { id } = req.params;
      const user= await cart.findOne({ user_id: decoded.id});

    if(user){
      user.products = user.products.filter(product => product.product_id !== id);
      await user.save()
    }
   
      res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
      console.error('Error deleting from wishlist:', error);
      res.status(500).json({ message: "Failed to delete from wishlist" });
  }
};
module.exports = {postcart,getcart,putcart,cartdel}