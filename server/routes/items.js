const express = require("express")
const routes = express.Router()
const multer = require("multer");
const { Posthomeitems } = require("../controller/Homeitems")

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        return cb(null,"./uploads/items");
    },
    filename : function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`)
    },
});
const upload = multer({storage})


routes.post("/homeitems",upload.single('photo'),Posthomeitems)


module.exports = routes