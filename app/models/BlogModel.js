"use strict";
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate")
const dayjs = require("dayjs")


const blogSchema = new mongoose.Schema({
    blogTitle: {
        type: String,
        required: true,
        trim: true
    },
     blogBody: {
        type: String,
        trim: true,
        required: true
    },
    author: {
        type: String,
        trim: true,
        required: true
    },
    date: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    }, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id.toString();
            ret.createdAt = dayjs(ret.createdAt).unix();
            ret.updatedAt = dayjs(ret.updatedAt).unix();
            delete ret.__v;
            delete ret._id;
        }
    },
    strict: false,
    timestamps: true

})
blogSchema.plugin(mongoosePaginate )
module.exports = mongoose.model("Blog", blogSchema)