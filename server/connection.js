const mongoose = require("mongoose")
mongoose.set("strictQuery",true)
function createConnection(url){
   return mongoose.connect(url)
}

module.exports = { createConnection }