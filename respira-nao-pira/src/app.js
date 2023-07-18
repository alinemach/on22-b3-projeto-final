require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('./database/dbConnect');
const breathingExerciseMediaRoutes = require('./routes/breathingExerciseMediaRoutes');
const breathingExerciseRoutes = require('./routes/breathingExerciseRoutes');
const symptomsRoutes = require('./routes/symptomsRoutes')
const mentalHealthAssistentRoutes = require('./routes/mentalHealthAssistentRoutes');

const app = express();

app.use(express.json());
app.use(cors());
mongoose.connect();

app.use('/respira-nao-pira/breathingExerciseMedia', breathingExerciseMediaRoutes);
app.use('/respira-nao-pira/breathingExercise', breathingExerciseRoutes);
app.use('/respira-nao-pira/symptoms', symptomsRoutes);
app.use("/respira-nao-pira/assistent", mentalHealthAssistentRoutes)

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger/swagger_output.json')

app.use('/minha-rota-de-documentacao', swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;
