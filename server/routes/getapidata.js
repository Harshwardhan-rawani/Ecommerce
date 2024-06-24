const express = require("express")
const { getapidata } = require("../controller/getapidata")
const routes = express.Router()

routes.get("/api/getdata",getapidata)
module.exports = routes