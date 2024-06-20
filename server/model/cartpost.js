const mongoose = require("mongoose")

const cart = new mongoose.Schema({
    user_id : {
        type : String,
         required : true
    },
   products:[{
    product_id : {
        type : String,
         required : true
    },
    quantity : {
        type : String,
         required : true
    },
    price : {
        type : String,
         required : true
    },
    image : {
        type : String,
         required : true,
    },
    title : {
        type : String,
         required : true
    },
   }]
    



})
const data = mongoose.model("cart",cart)

module.exports = data