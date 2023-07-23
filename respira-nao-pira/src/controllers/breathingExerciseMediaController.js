const breathingExerciseMediaModel = require('../models/breathingExerciseMediaModel');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;


const findAllMedia = async (req, res) => {
    try {
        const allMedia = await breathingExerciseMediaModel.find();
        res.status(200).json(allMedia)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}

const findMediaById = async (req, res) => {
    try {
        const findMedia = await
        breathingExerciseMediaModel.findById(req.params.id);
        if (findMedia == null) {
            res.status(404).json({
                message: "Game not found"
            });
        }
        res.status(200).json(findMedia)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}

const addNewMedia = async (req, res) => {
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
                bgURL,
                gifURL,
                soundTrackURL
            } = req.body

            const newMedia = new breathingExerciseMediaModel({
                bgURL,
                gifURL,
                soundTrackURL
            })
            const savedMedia = await newMedia.save()
            res.status(201).json({
                message: "New media sucessfully added",
                savedMedia
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}

const updateMedia = async (req, res) => {
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
                bgURL,
                gifURL,
                soundTrackURL
            } = req.body;
            const updateMedia = await
            breathingExerciseMediaModel.findByIdAndUpdate(req.params.id, {
                bgURL,
                gifURL,
                soundTrackURL
            });
            res.status(200).json({
                message: "Updated media",
                updateMedia
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Could not update"
        })
    }
}

const deleteMedia = async (req, res) => {
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
            } = req.params
            await breathingExerciseMediaModel.findByIdAndDelete(id)
            const message = "Media successfully deleted"
            res.status(200).json({
                message
            });
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    findAllMedia,
    findMediaById,
    addNewMedia,
    updateMedia,
    deleteMedia
}