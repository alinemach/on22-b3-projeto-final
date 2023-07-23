const symptomsModel = require('../models/symptomsModel');
const breathingExerciseModel = require('../models/breathingExerciseModel');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;


const findAllSymptoms = async (req, res) => {
    try {
        const allSymptoms = await symptomsModel.find().populate("breathingExercise");
        res.status(200).json(allSymptoms)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}

const findSymptomById = async (req, res) => {
    try {
        const findSymptom = await
        symptomsModel.findById(req.params.id).populate("breathingExercise");
        if (findSymptom == null)
            res.status(404).json({
                message: "Symptom not found"
            });
        res.status(200).json(findSymptom)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}

const addNewSymptom = async (req, res) => {
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
                breathingExerciseId,
                name
            } = req.body;

            if (!breathingExerciseId) {
                return res.status(400).json({
                    message: "Breathing exercise required"
                })
            }

            const findBreathingExercise = await
            breathingExerciseModel.findById(breathingExerciseId);
            if (!findBreathingExercise) {
                return res.status(404).json({
                    message: "Breathing exercise not found"
                })
            }

            const newSymptom = new symptomsModel({
                breathingExercise: breathingExerciseId,
                name
            });

            const savedSymptom = await newSymptom.save();
            res.status(201).json({
                message: "New symptom successfully added",
                savedSymptom
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}

const updateSymptom = async (req, res) => {
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
                breathingExerciseId,
                name
            } = req.body;

            const findSymptom = await symptomsModel.findById(id);
            if (findSymptom == null) {
                res.status(404).json({
                    message: "Symptom not found"
                })
            }
            if (breathingExerciseId) {
                const findBreathingExercise = await breathingExerciseModel.findById(breathingExerciseId);
                if (findBreathingExercise == null) {
                    return res.status(404).json({
                        message: "Breathing exercise not found"
                    })
                }
            }
            findSymptom.name = name || findSymptom.name;

            const savedSymptom = await findSymptom.save();
            res.status(200).json({
                message: "Symptom successfully updated",
                savedSymptom
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteSymptom = async (req, res) => {
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
            const findSymptom = await
            symptomsModel.findByIdAndDelete(id);

            if (findSymptom == null) {
                return res.status(404).json({
                    message: `Symptom with id ${id} not found`
                })
            }
            res.status(200).json({
                message: `Symptom with id ${id} was successfully deleted`
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
    findAllSymptoms,
    findSymptomById,
    addNewSymptom,
    updateSymptom,
    deleteSymptom
}