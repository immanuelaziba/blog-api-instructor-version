"use strict";
const express = require("express");
const router = express.Router();
const controller = require("../app/controller/AuthController");

 

router.post("/create-user", controller.createUser);

 
router.post("/login", controller.loginUser); 

 
 
module.exports =router 