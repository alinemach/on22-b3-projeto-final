const breathingExerciseMediaModel = require('../models/breathingExerciseMediaModel');


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
        breathingExerciseMediaModel.findById(req.params.id)
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
    } catch (error) {
        console.log(error)
        res.status(500).json({
        message: error.message
        })
    }
}

const updateMedia = async (req, res) => {
    try {
        const {
            bgURL,
            gifURL,
            soundTrackURL
        } = req.body
        const updateMedia = await
        breathingExerciseMediaModel.findByIdAndUpdate(req.params.id, {
            bgURL,
            gifURL,
            soundTrackURL
        })
        res.status(200).json({
            message: "Upadated media",
            updateMedia
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
        const {
            id
        } = req.params
        const removeMedia = await
        breathingExerciseMediaModel.findByIdAndDelete(id)
        const message = "Media successfully deleted"
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