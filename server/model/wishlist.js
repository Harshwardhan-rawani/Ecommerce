const mongoose = require("mongoose")

const cart = new mongoose.Schema({
    user_id : {
        type : String,
         required : true
    },
    p_id : {
        type : String,
         required : true
    },
    p_price : {
        type : String,
         required : true
    },
    p_title : {
        type : String,
         required : true
    },
    p_image : {
        type : String,
         required : true
    },

    



})
const data = mongoose.model("wishlist",cart)

module.exports = data