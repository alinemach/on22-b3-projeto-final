const mongoose = require('mongoose');
const breathingExerciseSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true
    },
    breathingDuration: {
        type: Number,
        required: true
    },
    media: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "media"
    }
});

const Model = mongoose.model("breathingExercise", breathingExerciseSchema);

module.exports = Model;