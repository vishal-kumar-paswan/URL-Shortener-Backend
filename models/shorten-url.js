const mongoose = require("mongoose");

const shortenURLSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model("ShortenURL", shortenURLSchema);
