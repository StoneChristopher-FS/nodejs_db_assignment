const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.json({
        message: "Makes - GET"
    });
});

router.get("/:makesId", (req, res, next) => {
    const makesId = req.params.makesId;
    
    res.json({
        message: "Makes - GET",
        id: makesId
    });
});

router.post("/", (req, res, next) => {
    res.json({
        message: "Makes - POST"
    });
});

router.patch("/:makesId", (req, res, next) => {
    const makesId = req.params.makesId;
    
    res.json({
        message: "Makes - PATCH",
        id: makesId
    });
});

router.delete("/:makesId", (req, res, next) => {
    const makesId = req.params.makesId;
    
    res.json({
        message: "Makes - DELETE",
        id: makesId
    });
});

module.exports = router;