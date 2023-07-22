const breathingExerciseModel = require('../models/breathingExerciseModel');
const breathingExerciseMediaModel = require('../models/breathingExerciseMediaModel');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;


const findAllBreathingExercise = async (req, res) => {
    try {
        const allBreathingExercise = await breathingExerciseModel.find();
        res.status(200).json(allBreathingExercise)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}

const findBreathingExerciseById = async (req, res) => {
    try {
        const authHeader = req.get("authorization");
        if (!authHeader) {
            return res.status(401).send("Missing authorization information")
        }
        const token = authHeader.split(" ")[1];
        jwt.verify(token, SECRET, async function (error) {
            if (error) {
                return res.status(403).send("Unauthorized access")
            }
            const findBreathingExercise = await
            breathingExerciseModel.findBreathingExerciseById(req.params.id).populate("breathingExercise");
        })
        if (findBreathingExercise == null)
            res.status(404).json({
                message: "Breathing exercise not found"
            });
        res.status(200).json(findBreathingExercise)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}

const addNewBreathingExercise = async (req, res) => {
    try {
        const authHeader = req.get("authorization");
        if (!authHeader) {
            return res.status(401).send("Missing authorization information")
        }
        const token = authHeader.split(" ")[1];
        jwt.verify(token, SECRET, async function (error) {
            if (error) {
                return res.status(403).send("Unauthorized access")
            }
            const {
                mediaId,
                name,
                description,
                message,
                breathingDuration
            } = req.body;
    
            if (!mediaId) {
                return res.status(400).json({
                    message: "Media id required"
                })
            }
    
            const findMedia = await
            breathingExerciseMediaModel.findById(mediaId);
            if (!findMedia) {
                return res.status(404).json({
                    message: "Media not found"
                })
            }
    
            const newBreathingExercise = new breathingExerciseModel({
                media: mediaId,
                name,
                description,
                message,
                breathingDuration
            });
    
            const savedBreathingExercise = await newBreathingExercise.save();
            res.status(201).json({
                message: "New Breathing exercise successfully added",
                savedBreathingExercise
            })
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}

const updateBreathingExercise = async (req, res) => {
    try {
        const authHeader = req.get("authorization");
        if (!authHeader) {
            return res.status(401).send("Missing authorization information")
        }
        const token = authHeader.split(" ")[1];
        jwt.verify(token, SECRET, async function (error) {
            if (error) {
                return res.status(403).send("Unauthorized access")
            }
            const {
                id
            } = req.params;
    
            const {
                mediaId,
                name,
                description,
                message,
                breathingDuration
            } = req.body;
    
            const findBreathingExercise = await breathingExerciseModel.findById(id);
            if (findBreathingExercise == null) {
                res.status(404).json({
                    message: "Breathing exercise not found"
                })
            }
            if (mediaId) {
                const findMedia = await
                breathingExerciseMediaModel.findById(mediaId);
                if (findMedia == null) {
                    return res.status(404).json({
                        message: "Media not found"
                    })
                }
            }
            findBreathingExercise.name = name || findBreathingExercise.name;
            findBreathingExercise.description = description || findBreathingExercise.description;
            findBreathingExercise.message = message || findBreathingExercise.message;
            findBreathingExercise.breathingDuration = breathingDuration || findBreathingExercise.breathingDuration;
    
            const savedBreathingExercise = await findBreathingExercise.save();
            res.status(200).json({
                message: "Breathing exercise successfully updated",
                savedBreathingExercise
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteBreathingExercise = async (req, res) => {
    try {
        const authHeader = req.get("authorization");
        if (!authHeader) {
            return res.status(401).send("Missing authorization information")
        }
        const token = authHeader.split(" ")[1];
        jwt.verify(token, SECRET, async function (error) {
            if (error) {
                return res.status(403).send("Unauthorized access")
            }
            const {
                id
            } = req.params;
            const findBreathingExercise = await
            breathingExerciseModel.findByIdAndDelete(id);
    
            if (findBreathingExercise == null) {
                return res.status(404).json({
                    message: `Breathing exercise with id ${id} not found`
                })
            }
            res.status(200).json({
                message: `Breathing exercise with id ${id} was successfully deleted`
            });
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    findAllBreathingExercise,
    findBreathingExerciseById,
    addNewBreathingExercise,
    updateBreathingExercise,
    deleteBreathingExercise
}