const express = require('express');
const https = require('https');
const QuizzesScore = require('../Models/quiz-score.model')

const jwt = require('jsonwebtoken');

//const requireLogin = require('../Middleware/UserToken.js')
const router = express.Router()

const AddQuizScore = (req,res,next)=>
{
    const quizscore = new QuizzesScore({   
     quiz_id:req.body.quiz_id,
     student_id: req.body.student_id,
     campname: req.body.campname,
     quiz_score: req.body.quiz_score,
     total_questions: req.body.total_questions
      
      });
      try{
          quizscore.save();
          res.send(quizscore);
      }
      catch(err)
      {
          console.log(err);
          return res.status(422).send({error: err.message});
      }
}

exports.AddQuizScore = AddQuizScore;