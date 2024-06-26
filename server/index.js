require('dotenv').config();
const express = require("express")
const app = express();
const cors = require('cors')
const port = process.env.PORT || 8000
const path = require("path")
//connection
const { createConnection }  = require("./connection")
//routes
const Signuproute_router = require("./routes/signup.js")
const items_router = require("./routes/items.js")
const homedata_router = require("./routes/home.js")
const cartpost_routes =require("./routes/cartpost.js")
const Login_router = require("./routes/login.js")
const Profile_router=require("./routes/Profile.js")
const wishlist_routes = require("./routes/wishlist.js")
//model
const model = require("./model/signup")
const homeitems = require("./model/Homeitems.js")
const cart = require("./model/cartpost.js")


//connection
createConnection(process.env.MONOGODB)
.then(()=>{console.log("mongodb connected")}).catch(()=>{console.log("error")});

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname)))

app.use("/",Signuproute_router)
app.use("/login",Login_router)
app.use("/profile",Profile_router)
app.use("/item",homedata_router)
app.use("/admin",items_router)
app.use("/wishlist",wishlist_routes)
app.use("/cart",cartpost_routes)
app.listen(port,()=>{console.log(`server connect at localhost:${port}`)})