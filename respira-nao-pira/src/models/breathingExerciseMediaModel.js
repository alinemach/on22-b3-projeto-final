const mongoose = require('mongoose');
const mediaSchema = mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    bgURL: {
        type: String,
        required: true
    },
    gifURL: {
        type: String,
        required: true
    },
    soundTrackURL: {
        type: String,
        required: true
    }
});

const Model = mongoose.model("media", mediaSchema);
module.exports = Model;