const express = require("express");
const routes = express.Router();
const { postsignup } = require("../controller/signup");

routes.post("/",postsignup)

module.exports = routes