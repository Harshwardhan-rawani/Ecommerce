const mongoose = require("mongoose")

const items = new mongoose.Schema({
    filename : {
        type : String,
        required : true
    },
    photo : {
        type : String,
        required : true
    }
})

const productlist = mongoose.model("items",items)
module.exports = productlist