const mentalHeathAssistentModel = require('../models/mentalHeathAssistentModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const addNewAssistent = async (req, res) => {
    try {
        const pswdWithHash = await bcrypt.hash(req.body.password, 10);
        req.body.password = pswdWithHash;

        const mentalHeathAssistent = new mentalHeathAssistentModel(req.body);
        await mentalHeathAssistent.save();

        res.status(201).send(mentalHeathAssistent.toJSON());
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: error.message
        });
    }
};

const getAllAssistents = async (req, res) => {
    try {
        const mentalHeathAssistents = await mentalHeathAssistentModel.find();
        res.status(200).send(mentalHeathAssistents);
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: error.message
        });
    }
};

const deleteAssistentById = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        await mentalHeathAssistentModel.findByIdAndDelete(id);
        const message = `Mental health assistant id ${id} successfully removed`;
        res.status(200).json({
            message
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const mentalHeathAssistent = await mentalHeathAssistentModel.findOne({
            email: req.body.email,
        });

        if (!mentalHeathAssistent) {
            return res.status(404).send(`There's no mental health assistant with email ${req.body.email}`);
        }

        const checkPswd = await bcrypt.compare(req.body.password, mentalHeathAssistent.password);

        if (!checkPswd) {
            return res.status(403).send("Invalid Password");
        }

        const token = jwt.sign({
            email: req.body.email
        }, SECRET);
        return res.status(200).send(token);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addNewAssistent,
    getAllAssistents,
    deleteAssistentById,
    login,
};