const mongoose = require('mongoose');
const symptomSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    name: {
        type: String,
        required: true
    },
    breathingExercise: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "breathingExercise"
    }
});

const Model = mongoose.model("symptom", symptomSchema)

module.exports = Model;