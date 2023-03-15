const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//const QuizzesScore = require('../Models/quiz-score.model')
const TokenTeacher = require('../Middleware/TeacherToken')
const LeaderboardController = require('../Controllers/leaderboard.controller')
const Teacher = require('../Models/teacher.model')

//router.post('/adddetails', LeaderboardController.VerifyAndAddAssignmentScore)

router.post ('/addassignscore', LeaderboardController.addAssignmentScore)

router.post ('/addquizscore', LeaderboardController.addQuizScore)

router.get('/getdetails/:campname' , LeaderboardController.GetDetails)

//router.get('/getdetails',LeaderboardController.GetDetails)
  

module.exports = router