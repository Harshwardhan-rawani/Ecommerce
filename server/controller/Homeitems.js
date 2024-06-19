const itemlist = require("../model/Homeitems")

async function Posthomeitems(req,res){
    
    const data = req.body
    const user_detail = {
        filename : data.filename,
       
    }

    itemlist.insertMany({
        filename : user_detail.filename,
        photo: req.file.path
    })

}




module.exports = {Posthomeitems}