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
     student_name: req.body.student_name,
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
const GetQuizzesScore = (req,res,next)=>
{
   QuizzesScore.find((error,data) => {
        if(error)
        {
            res.send("Could Not Get Quizzes Score")
        }
        else 
         {
            res.json(data)
         }
    })
}
const GetSingleQuizScore = (req,res,next)=>
{
    var x = req.query.id;
    QuizzesScore.findById(x , (error,data) =>
    {
        if(error)
        {
            return next(error);
        }
        else 
        {
            res.json(data);
        }
    })
}

const GetQuizResults = async (req, res, next) => {
    //console.log(req.params);
    const studentquizId = req.params.studentquizId; // get the teacher assignment id from the request parameter
    
    const quiz = await QuizzesScore.find({ quiz_id: studentquizId }); // only find submitted quiz that match the teacher quiz id
    res.send(quiz);
  };

  exports.GetQuizResults = GetQuizResults;
exports.AddQuizScore = AddQuizScore;
exports.GetQuizzesScore = GetQuizzesScore;
exports.GetSingleQuizScore = GetSingleQuizScore;