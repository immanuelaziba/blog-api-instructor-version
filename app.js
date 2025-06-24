"use strict";
const express = require("express");
const app = express();
const logger = require("morgan");
require("dotenv").config({})
require("./app/database/db")
const {StatusCodes} = require("http-status-codes")
const path = require("path")



// Static access to uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//middleware Declaration
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));


// routes
require("./routes")(app)

// catch 404 and forward to error handler
app.use((err, req, res, next) => {
    return res.status(err.status || StatusCodes.NOT_FOUND)
        .json({error: err.message});
});

// error handler
app.use((err, req, res, next) => {
    console.log("Error", err);
    res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json({error: err.message});
});


const port = process.env.PORT || 8000

app.listen(port,()=>{
 console.log(`Server is running on port ${port}`)
})

