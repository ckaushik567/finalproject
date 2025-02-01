const mongoose = require('mongoose');
const clicksSchema = new mongoose.Schema({
    linkId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Link",
        // required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    clicks: {
        type: Number,
        default: 0
    }
})

const Clicks = new mongoose.model("Clicks", clicksSchema);
module.exports = Clicks;