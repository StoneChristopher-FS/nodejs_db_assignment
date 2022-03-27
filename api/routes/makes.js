const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Make = require("../models/make");
const Messages = require("../../messages/messsages");


router.get("/", (req, res, next) => {
    Make.find({})
        .select("make _id")
        .populate("model", "year model")
        .then(result => {
            console.log("Makes");
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

router.get("/:makesId", (req, res, next) => {
    const makesId = req.params.makesId;
    
    Make.findById(makesId)
    .select("make _id")
    .populate("model", "year model")
    .exec()
    .then((make) => {
      if(!make){
        console.log(make);
        return res.status(404).json({
          message: Messages.make_not_found
        });
      };

      res.status(201).json({
        make,
        metadata: {
          method: req.method,
          host: req.hostname
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          message: err.message,
        },
      });
    });
});

router.post("/", (req, res, next) => {
    
    Make.find({
        make: req.body.make
    })
    .exec()
    .then(result => {
        console.log(result);
        if(result.length > 0) {
            return res.status(406).json({
                message: Messages.make_dupicate
            })
        };

        const newMake = new Make({
            _id: mongoose.Types.ObjectId(),
            make: req.body.make,
            model: req.body.model
        });

        // write to the db
        newMake.save()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    message: Messages.make_saved,
                    make: {
                        make: result.make,
                        id: result._id,
                        metadata: {
                            method: req.method,
                            host: req.hostname
                        }
                    }
                });
            })
            .catch(err => {
                console.error(err.message)
                res.status(500).json({
                    error: {
                        message: err.message
                    }
                });
            })
    })
    .catch(err => {
        console.error(err.message);
        res.status(500).json({
            error: {
                messsage: "Unable to save the make: " + req.body.make
            }
        });
    });
});

router.patch("/:makesId", (req, res, next) => {
    const makesId = req.params.makesId;
    
    Make.findById(makesId)
    .select("name _id")
    .exec()
    .then((make) => {
      if(!make){
        console.log(make);
        return res.status(404).json({
          message: Messages.make_not_found
        });
      };

      const updatedMake = {
        make: req.body.make,
        model: req.body.model
      };

      Make.updateOne({_id:makesId}, {$set: updatedMake})
        .then(result => {
            res.status(200).json({
                message: Messages.make_update,
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
            });
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          message: err.message,
        }
      });
    });
    
});

router.delete("/:makesId", (req, res, next) => {
    const makesId = req.params.makesId;
    
    Make.findById(makesId)
    .select("name _id")
    .populate("make")
    .exec()
    .then((make) => {
      if(!make){
        console.log(make);
        return res.status(404).json({
          message: Messages.make_not_found
        })
      }

      Make.deleteOne({_id:makesId})
        .then(result => {
            res.status(200).json({
                message: Messages.make_remove,
                result,
                request: {
                    method: "GET",
                    url: "http://localhost:3000/makes/" + makesId
                },
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
            });
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          message: err.message,
        }
      });
    });
});

module.exports = router;