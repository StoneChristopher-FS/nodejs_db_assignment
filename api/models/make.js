const mongoose = require("mongoose");

const makeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    make: {
        type: String,
        required: true
    },
    model: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Model",
        required: true
    }
});

module.exports = mongoose.model("Make", makeSchema);