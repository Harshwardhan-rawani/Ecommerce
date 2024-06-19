const express = require("express")
const { postcart,getcart, putcart,cartdel } = require("../controller/cartpost")

const routes = express.Router()
const multer = require('multer');
const upload = multer();

routes.post("/",upload.none(),postcart)
routes.get("/",getcart)
routes.put("/",putcart)
routes.delete("/:id",cartdel)

module.exports = routes