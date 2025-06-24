"use strict";
const express = require("express")
const router = express.Router();
const controller = require("../app/controller/BlogController")
const {authenticateUser} = require("../app/middleware/authMiddleware")
const upload = require("../app/utils/imageUploader")


//EAMPLE ON HOW TO PASS THE AUTH MIDDLEWARE

router.post("/create-blog",authenticateUser,  upload.single("image"), controller.createBlog)

router.get("/get-all-blogs", controller.getAllBlogs)

router.get("/get-blog/:blogId", controller.getBlog) 

// complete the update and delete routes
// Update blog (PUT)
router.put("/update-blog/:blogId", authenticateUser, upload.single("image"), controller.updateBlog);

// Delete blog (DELETE)
router.delete("/delete-blog/:blogId", authenticateUser, controller.deleteBlog);

module.exports =router