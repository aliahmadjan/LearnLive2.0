const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const AssignmentsScoreController = require('../Controllers/assignment-score.controller')
const StudentToken = require('../Middleware/StudentToken')

router.post('/addassignmentscore',AssignmentsScoreController.AddAssingmentScore);

router.get('/getassignmentsscores',AssignmentsScoreController.GetQuizzesScore);

router.get('/getassignmentscore/:id',AssignmentsScoreController.GetSingleQuizScore);

router.get('/getassignmentresults/:assignmentID',AssignmentsScoreController.GetQuizResults);

router.get('/getassignmentmarks/:studentName',AssignmentsScoreController.GetQuizResultsByName);

router.post('/updateassignscore',AssignmentsScoreController.UpdateAssignmentScore)


    //if field is empty
    // if (!oldhobby || !newhobby) {
    //   return res.status(422).json({ error: "Please enter your Hobby" });
    // }
    // //find user if it exists
    // const savedUser = await Veteran.findOne({ email: req.user.email });
    // //if user does not exist
    // if (!savedUser) {
    //   return res.status(422).json({ error: "Cannot find user" });
    // }
    // if (savedUser.hobbies.includes(newhobby)) {
    //   return res.status(422).json({ error: "Hobby Already Exists" });
    // }
    // for (i in savedUser.hobbies) {
    //   if (savedUser.hobbies[i] == oldhobby) {
    //     savedUser.hobbies[i] = newhobby;
    //   }
    // }
    // //savedUser.hobbies.push(hobby);
    // await savedUser.save();
    // res.send(savedUser);


module.exports = router;