"use strict";
const { StatusCodes } = require("http-status-codes");
const User = require("../models/UserModel");
const authValidator = require("../validators/AuthValidator");
const jwt = require("jsonwebtoken");



exports.createUser = async (body) => {
    try {
        const validatorError = await authValidator.createUser(body);
        if (validatorError) {
            return {
                error: validatorError,
                status: StatusCodes.BAD_REQUEST
            };
        }
        const { email } = body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return {
                error: "User with this email already exists.",
                status: StatusCodes.CONFLICT
            };
        }

        const user = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phoneNumber: body.phoneNumber,
            password: body.password
        })


        return {
            data: {
                user: {
                    userId: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phoneNumber: user.phoneNumber
                },
            },
            statusCode: StatusCodes.CREATED
        };
    } catch (e) {
        console.log("An unknown error occurred while creating user. Please try again later.", e);
        return {
            error: e.message,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR
        }
    }
}

exports.loginUser = async (body) => {
    try {
        const validatorError = await authValidator.loginUser(body);
        if (validatorError) {
            return {
                error: validatorError,
                status: StatusCodes.BAD_REQUEST
            };
        }

        const { email, password } = body;


        const user = await User.findOne({ email });
        
        if (!user) {
            return {
                error: "Oops! User with this email does not exist.",
                statusCode: StatusCodes.NOT_FOUND
            };
        }

        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            return {
                error: "Oops! Invalid Credentials.",
                statusCode: StatusCodes.BAD_REQUEST
            };
        }

        const token = jwt.sign({
            userId: user._id
        },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_LIFETIME || "1h",
                algorithm: "HS256"
            });

        return {
            data: {
                user: {
                    userId: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,

                },
                token: token
            },
            statusCode: StatusCodes.OK
        };
    } catch (e) {
        console.log("An unknown error occurred while logging in. Please try again later.", e);
        return {
            error: e.message,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR
        }
    }
}