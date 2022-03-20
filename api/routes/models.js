const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Model = require("../models/model");

router.get("/", (req, res, next) => {
    Model.find({})
        .then(result => {
            console.log("Inventory");
            res.status(200).json({
                result,
                metadata: {
                    method: req.method,
                    host: req.hostname
                }
            });
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).json({
                error: {
                    message: err.message
                }
            });
        });
});

router.get("/:modelId", (req, res, next) => {
    const modelId = req.params.modelId

    Model.findById({_id:modelId})
        .then(result => {
            console.log("Inventory");
            res.status(200).json({
                result,
                metadata: {
                    method: req.method,
                    host: req.hostname
                }
            });
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).json({
                error: {
                    message: err.message
                }
            });
        });
});

router.post("/", (req, res, next) => {
    const newModel = new Model({
        _id: mongoose.Types.ObjectId(),
        year: req.body.year,
        make: req.body.make,
        model: req.body.model
    });

    newModel.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "New Car Added",
                car: {
                    year: result.year,
                    make: result.make,
                    model: result.model,
                    id: result._id,
                },
                metadata: {
                    method: req.method,
                    host: req.hostname
                }
            });
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).json({
                error: {
                    message: err.message
                }
            });
        });
});

router.patch("/:modelId", (req, res, next) => {
    const modelId = req.params.modelId

    const updatedModel = {
        year: req.body.year,
        make: req.body.make,
        model: req.body.model
    }

    Model.updateOne({_id:modelId}, {$set: updatedModel})
        .then(result => {
            res.status(200).json({
                message: "Updated Model",
                result,
                metadata: {
                    method: req.method,
                    host: req.hostname
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: {
                    message: err.message
                }
            })
        });
});

router.delete("/:modelId", (req, res, next) => {
    const modelId = req.params.modelId

    Model.deleteOne({_id:modelId})
        .then(result => {
            res.status(200).json({
                message: "Deleted Model",
                result,
                metadata: {
                    method: req.method,
                    host: req.hostname
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: {
                    message: err.message
                }
            })
        });
});

module.exports = router;