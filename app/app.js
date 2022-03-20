const express = require("express");
const app = express();
const morgan = require("morgan");

// middleware for logging
app.use(morgan("dev"));

// middleware for parsing
app.use(express.urlencoded({
    extended: true
}));

// middleware that all request are json
app.use(express.json());

// middleware for CORS Policy
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST, PUT, GET, PATCH, DELETE");
    };

    next();
})

// GET method to verify server is running
app.get("/", (req, res, next) => {
    res.status(201).json({
        message: "Service is up!",
        method: req.method
    })
})

// middleware for error handling
app.use((req, res, next) => {
    const error = new Error("NOT FOUND!!!");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message, 
            status: error.status,
            method: req.method
        }
    });
});

module.exports = app;