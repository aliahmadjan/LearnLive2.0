const express = require('express');
const https = require('https');
const AssingmentScore = require('../Models/assignment-score.model')
const Leaderboard = require('../Models/leaderboard.model')

const jwt = require('jsonwebtoken');

//const requireLogin = require('../Middleware/UserToken.js')
const router = express.Router()

const AddAssingmentScore = async (req, res, next) => {
  const { tchassignment_id, stdassignment_id, student_name, student_id, assignment_score, tmarks } = req.body;

  try {
    // Check if an assignment score already exists for the given student and assignment
    const existingScore = await AssingmentScore.findOne({ tchassignment_id, stdassignment_id, student_id });
    if (existingScore) {
      return res.status(400).send({ error: 'An assignment score already exists for this student and assignment.' });
    }

    // Create a new assignment score entry
    const assignmentScore = new AssingmentScore({   
      tchassignment_id,
      stdassignment_id,
      student_name,
      student_id,
      assignment_score,
      tmarks
    });

    await assignmentScore.save();
    res.send(assignmentScore);
  } catch (err) {
    console.log(err);
    return res.status(422).send({ error: err.message });
  }
};

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

// const GetQuizResults = async (req, res, next) => {
//     //console.log(req.params);
//     const {student_name} = req.body

//     const studentID = req.params.studentID; // get the teacher assignment id from the request parameter
//     const assignment = await AssingmentScore.find({ tchassignment_id: studentID }); // only find submitted quiz that match the teacher quiz id
//     res.send(assignment);
//   };

const GetQuizResults = async (req, res, next) => {
  //const studentName = req.params.studentName;
  const assignmentID = req.params.assignmentID;

  let arr = []
  const assignment = await AssingmentScore.find({ tchassignment_id: assignmentID });
  
  if (!assignment) {
    res.status(404).send('Assignment not found for this student');
  } else {
    arr.push(...assignment)
    res.send(arr);
  }
};


  const GetQuizResultsByName = async (req, res, next) => {
    try {
      const studentName = req.params.studentName;
      const assignmentMarks = await AssingmentScore.find({ student_name: studentName });
      res.send(assignmentMarks);
    } catch (error) {
      next(error);
    }
  }

  const UpdateAssignmentScore = async(req,res,next) =>
{
  const { assignment_score, stdassignment_id, student_id } = req.body;

    // Convert assignment_score to a number
    const numericScore = Number(assignment_score);

    if (isNaN(numericScore)) {
      return res.status(400).send('Invalid assignment score.');
    }

  try {
    const updatedScore = await AssingmentScore.updateOne(
    //await db.collection('assignmentscore').updateOne(
      { stdassignment_id: stdassignment_id, student_id: student_id },
      { $set: { assignment_score: numericScore  } }
    );


     // Update the Leaderboard table
     const updatedLeaderboard = await Leaderboard.updateOne(
      {  student_id: student_id },
      { $set: { assignment_score: numericScore  } }
    );
    res.status(200).send({ assignmentScore: updatedScore,  updatedLeaderboard ,message: "Updated"});
    //res.send({ assignmentScore: updatedScore,  updatedLeaderboard });
    //res.send(updatedScore);
  } catch (err) {
    console.error(err);
    res.status(500).send({message: "Error"});
  }
    }


  exports.GetQuizResults = GetQuizResults;
exports.AddAssingmentScore = AddAssingmentScore;
exports.GetQuizzesScore = GetQuizzesScore;
exports.GetSingleQuizScore = GetSingleQuizScore;
exports.GetQuizResultsByName = GetQuizResultsByName
exports.UpdateAssignmentScore = UpdateAssignmentScore;