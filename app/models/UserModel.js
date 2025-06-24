"use strict";
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const mongoosePaginate = require("mongoose-paginate");



const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        max: 15
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id.toString();
            delete ret.__v;
            delete ret._id;
        }
    },
    timestamps: true,
    strict: false,

});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("User", userSchema);