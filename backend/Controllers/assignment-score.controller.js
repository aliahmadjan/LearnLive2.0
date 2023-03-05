const express = require('express');
const https = require('https');
const AssingmentScore = require('../Models/assignment-score.model')

const jwt = require('jsonwebtoken');

//const requireLogin = require('../Middleware/UserToken.js')
const router = express.Router()

const AddAssingmentScore = (req,res,next)=>
{
    const assignmentScore = new AssingmentScore({   
     tchassignment_id:req.body.tchassignment_id,
     stdassignment_id:req.body.stdassignment_id,
     student_name: req.body.student_name,
     student_id:req.body.student_id,
     assignment_score: req.body.assignment_score,
     tmarks: req.body.tmarks
      
      });
      try{
          assignmentScore.save();
          res.send(assignmentScore);
      }
      catch(err)
      {
          console.log(err);
          return res.status(422).send({error: err.message});
      }
}
const GetQuizzesScore = (req,res,next)=>
{
   AssingmentScore.find((error,data) => {
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
    AssingmentScore.findById(x , (error,data) =>
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
    const studentID = req.params.studentID; // get the teacher assignment id from the request parameter
    const assignment = await AssingmentScore.find({ tchassignment_id: studentID }); // only find submitted quiz that match the teacher quiz id
    res.send(assignment);
  };

  exports.GetQuizResults = GetQuizResults;
exports.AddAssingmentScore = AddAssingmentScore;
exports.GetQuizzesScore = GetQuizzesScore;
exports.GetSingleQuizScore = GetSingleQuizScore;