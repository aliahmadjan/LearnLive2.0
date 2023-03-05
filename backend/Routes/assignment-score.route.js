const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const AssignmentsScoreController = require('../Controllers/assignment-score.controller')

router.post('/addassignmentscore',AssignmentsScoreController.AddAssingmentScore);

router.get('/getassignmentsscores',AssignmentsScoreController.GetQuizzesScore);

router.get('/getassignmentscore/:id',AssignmentsScoreController.GetSingleQuizScore);

router.get('/getassignmentresults/:studentID',AssignmentsScoreController.GetQuizResults);

module.exports = router;