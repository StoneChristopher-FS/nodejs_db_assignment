const mongoose = require("mongoose");

const modelSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    year: Number,
    make: String,
    model: String 
});

module.exports = mongoose.model("Model", modelSchema);