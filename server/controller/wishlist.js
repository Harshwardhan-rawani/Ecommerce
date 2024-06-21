const model = require("../model/wishlist"); // Adjust the path as per your project structure
const jwt = require("jsonwebtoken");

async function saveUserData(userid, products) {
    try {
        const newUser = new model({
            user_id: userid,
            products: products,
        });
        await newUser.save();
        console.log('User data saved successfully!');
    } catch (error) {
        console.error('Error saving user data:', error);
        throw error; // Ensure to propagate the error if needed
    }
}

const postwishlist = async (req, res) => {
    const data = req.body;
    const token = req.header('Authorization').replace("Bearer ", "");
    try {
        const decoded = jwt.verify(token, process.env.Jwt_token);
        let user = await model.findOne({ user_id: decoded.id });

        if (!user) {
            await saveUserData(decoded.id, data);
        } 
        else {
            const item = user.products.find(item=>item.p_id == data.p_id)

            if(!item){
                user.products.push(data);
                await user.save();
                return res.status(200).json({ message: "Successfully added" });
            }
            return res.status(200).json({ message: "Already added" });
        }
    } catch (error) {
        console.log("error")
        res.status(500).json({ message: "Failed to add to wishlist" });
    }
};

const getwishlist = async (req, res) => {
    try {
        const token = req.header('Authorization').replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.Jwt_token);
        const data = await model.find({ user_id: decoded.id });
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        res.status(500).json({ message: "Failed to fetch wishlist" });
    }
};

const deletewishlist = async (req, res) => {
    try {
    
        const token = req.header('Authorization').replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.Jwt_token);
        const { id } = req.params;
        const user= await model.findOne({ user_id: decoded.id});

      if(user){
        user.products = user.products.filter(product => product.p_id !== id);
        console.log(user.products)
        await user.save()
      }
     
        res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
        console.error('Error deleting from wishlist:', error);
        res.status(500).json({ message: "Failed to delete from wishlist" });
    }
};

module.exports = { postwishlist, getwishlist, deletewishlist };
