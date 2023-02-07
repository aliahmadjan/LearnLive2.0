const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const QuizzesScore = require('../Models/quiz-score.model')
const QuizzesScoreController = require('../Controllers/quiz-score.controller')

router.post('/addquizscore',QuizzesScoreController.AddQuizScore);


module.exports = router;