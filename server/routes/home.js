const express = require("express")
const { gethomeitems } = require("../controller/home")
const routes = express.Router()

routes.route("/api").get(gethomeitems)

module.exports = routes