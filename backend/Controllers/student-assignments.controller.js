const express = require('express');
const https = require('https');
const StudentAssignments = require('../Models/student-assignments.model');
const TeacherAssignments = require('../Models/teacher-assignments.model')


const GetSubmittedAssignments = async (req, res, next) => {
    const teacherAssignmentId = req.params.teacherAssignmentId; // get the teacher assignment id from the request parameter
    const stdass = await StudentAssignments.find({ quizid: teacherAssignmentId }); // only find submitted assignments that match the teacher assignment id
    res.send(stdass);
  };

const GetAssignments = async(req,res,next)=>
{
   // res.sendFile(__dirname + ".pdf");
   StudentAssignments.find((error,data)=>
    {
        if(error)
        {
            return next(error);
        }
        else{
            res.json(data);
        }
    })
};

const GetSingleAssignment = async(req,res,next)=>
{
    var x = req.query.id;
    StudentAssignments.findById(x , (error,data) =>
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
};

const UpdateAssignments = async(req,res,next)=>
{
    StudentAssignments.findByIdAndUpdate(req.params.id, {
        $set: req.body
          }, (error, data) => {
            if (error) {
              res.send("Error")
              console.log(error)
            } else {
              res.json(data)
            }
          })
}

const DeleteAssignments = async(req,res,next)=>
{
    StudentAssignments.findByIdAndDelete(req.params.id,(error,data)=> {
        if(error){
            return next(error);
        }
        else {
            res.send("Post Deleted Successfully!")
            res.status(200).json({
                msg:data
            })
        }
    })
}


//exports.AddPost = AddPost;
exports.GetAssignments=GetAssignments
exports.GetSingleAssignment= GetSingleAssignment;
exports.UpdateAssignments= UpdateAssignments;
exports.DeleteAssignments = DeleteAssignments;
exports.GetSubmittedAssignments = GetSubmittedAssignments;