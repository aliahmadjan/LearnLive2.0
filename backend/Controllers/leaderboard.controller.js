const express = require('express');
const https = require('https');
const Leaderboard = require('../Models/leaderboard.model')

const jwt = require('jsonwebtoken');

//const requireLogin = require('../Middleware/UserToken.js')
const router = express.Router()


// Function to add assignment score details to leaderboard
const addAssignmentScore = async (req, res) => {
  const { campname, tchassignment_id, student_id, student_name, assignment_score, total_assignmentscore, total_quizscore } = req.body;

  try {
    // Check if leaderboard entry already exists
    const lb = await Leaderboard.findOne({ campname, student_id, student_name });
    if (lb) {
      // Check if tchassignment_id already exists in the array
      if (!lb.tchassignment_id.includes(tchassignment_id)) {
        // Add new tchassignment_id, assignment_score and total_assignmentscore
        lb.tchassignment_id.push(tchassignment_id);
        lb.assignment_score.push(assignment_score);
        lb.total_assignmentscore.push(total_assignmentscore);
      }
      //lb.total_quizscore = total_quizscore
      await lb.save();
      res.status(200).json(lb);
    } else {
      // Create a new leaderboard entry with the given details
      const newLB = new Leaderboard({
        campname,
        tchassignment_id: [tchassignment_id],
        student_id,
        student_name,
        assignment_score: [assignment_score],
        total_assignmentscore: [total_assignmentscore],
        //total_quizscore,
      });

      await newLB.save();
      res.status(201).send(newLB);
    }
  } catch (err) {
    console.log(err);
    res.status(422).send({ error: err.message });
  }
};


const addQuizScore = async (req, res) => {
  const { campname, tchquiz_id, student_id, student_name, quiz_score, total_quizscore } = req.body;

  try {
    // Check if leaderboard entry already exists
    const lb = await Leaderboard.findOne({ campname, student_id, student_name });
    if (lb) {
      // Check if tchquiz_id already exists in the array
      if (!lb.tchquiz_id.includes(tchquiz_id)) {
        // Add new tchquiz_id, assignment_score and total_assignmentscore
        lb.tchquiz_id.push(tchquiz_id);
        lb.quiz_score.push(quiz_score);
        lb.total_quizscore.push(total_quizscore);
      }
      //lb.total_quizscore = total_quizscore
      await lb.save();
      res.status(200).json(lb);
    } else {
      // Create a new leaderboard entry with the given details
      const newLB = new Leaderboard({
        campname,
        tchquiz_id: [tchquiz_id],
        student_id,
        student_name,
        quiz_score: [quiz_score],
        total_quizscore: [total_quizscore],
        //total_quizscore,
      });

      await newLB.save();
      res.status(201).send(newLB);
    }
  } catch (err) {
    console.log(err);
    res.status(422).send({ error: err.message });
  }
};


const GetDetails = async (req, res, next) => {
  try {
    const campname = req.params.campname;
    const data = await Leaderboard.find({ campname: campname });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Could not camp data");
  }
};





//   const GetDetails = (req,res,next)=>
// {
//    Leaderboard.find((error,data) => {
//         if(error)
//         {
//             res.send("Could Not Get Quizzes Score")
//         }
//         else 
//          {
//             res.json(data)
//          }
//     })
// }






exports.addAssignmentScore = addAssignmentScore
exports.addQuizScore = addQuizScore
//exports.VerifyAndAddAssignmentScore = VerifyAndAddAssignmentScore
exports.GetDetails = GetDetails