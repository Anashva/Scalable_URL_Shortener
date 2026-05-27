const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },

    shortCode: {
        type: String,
        unique: true
    },

    clicks: {
        type: Number,
        default: 0
    },

    expiresAt: {
        type:Date,
        dfault:0
    }

}, { timestamps: true });

// urlSchema.index({ shortCode: 1 });

module.exports = mongoose.model("URL", urlSchema);