const mongoose = require("mongoose")

const detail = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    pass : {
        type : String,
        required : true
    },
    Phone : {
        type : String,
        required : true
    },
    

})

const Person = mongoose.model("SignupForm",detail)
module.exports = Person