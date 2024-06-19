const express = require("express")
const routes =  express.Router()
const {postwishlist, getwishlist, deletewishlist} = require("../controller/wishlist")
const multer = require('multer');
const upload = multer();

routes.post("/",upload.none(),postwishlist)
routes.get("/",getwishlist)
routes.delete("/:id",deletewishlist)

module.exports = routes