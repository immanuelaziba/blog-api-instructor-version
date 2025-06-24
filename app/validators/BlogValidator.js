"use strict";
const Joi = require("joi")
const {validate} = require("../utils/helpers")


exports.createBlog = async(body)=>{
    let schema ={
        blogTitle:Joi.string().required().trim(),
        blogBody:Joi.string().required().trim(),
        author:Joi.string().required(),
        date:Joi.string().required(),
        image:Joi.string().uri().optional("")

    }
 return validate(schema, body)
}

exports.updateBlog = async(body)=>{
    let schema ={
        blogTitle:Joi.string().required().trim(),
        blogBody:Joi.string().required().trim(),
        author:Joi.string().required(),
        date:Joi.string().required(),
        image:Joi.string().uri().optional("")

    }
 return validate(schema, body)
}