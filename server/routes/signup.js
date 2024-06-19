const express = require("express");
const routes = express.Router();
const { postsignup,postForgot } = require("../controller/signup");

routes.post("/signup",postsignup)
routes.put("/forgot",postForgot)

module.exports = routes