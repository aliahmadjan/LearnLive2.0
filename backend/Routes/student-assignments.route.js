const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const {v4: uuidv4} = require('uuid')
const StudentAssignments = require('../Models/student-assignments.model')
const StudentAssignmentsController  = require('../Controllers/student-assignments.controller')
//const TeacherController = require('../Controllers/teacher.controller')

const DIR = './student-assignments/';

const storage = multer.diskStorage({
    destination: (req,file,cb) => 
    {
        cb(null,DIR);
    },

    filename: (req,file,cb)=>
    {
        const filename =file.originalname.toLowerCase();
        cb(null,filename)
        //.split('').join('-')
        //+'-'+
        //uuidv4()
    }
});

var upload =multer({
    storage: storage,
    fileFilter: (req,file,cb) => {
        if(file.mimetype = "image/png" ||  file.mimetype =="application/pdf" || file.mimetype =="image/jpg" || file.mimetype == "image/jpeg")
        {
            cb(null,true);
        }
        else
        {
            cb(null,false);
            return cb(new Error('Only .pdf .png .jpg and .jpeg format allowed!'));
        }
    }
});



// router.post('/submitassigns',  upload.array('uplassign',4),async (req,res,next) =>
// {

//     let reqFiles = [];
//     const url = req.protocol+ '://' +req.get('host');
//     for (let i=0;i<req.files.length;i++)
//     { 
//         reqFiles.push(url +'/student-assignments/'+ req.files[i].filename)
//     }
    
//     const submitted = Boolean(req.body.submitted);
//     const submittedString = submitted.toString();
//     const stdAss = new StudentAssignments({   
//         campname: req.body.campname,
//         student_name : req.body.student_name,
//         title: req.body.title,
//         description: req.body.description,
//         tmarks:req.body.tmarks,
//         duedate:req.body.duedate,
//         submitted_date:req.body.submitted_date,
//         uplassign:reqFiles,
//         assignment_id:req.body.assignment_id,
//         student: req.body.student,
//         submit_status: req.body.submit_status,
//     });
//     try {
//         if (stdAss.assignment_id) {
//             // Assignment has already been submitted, don't add it to the database
//             res.status(200).send({message: "Already Submitted"});
//         } else {
//             // Assignment has not been submitted, add it to the database
//             await stdAss.save();
//             res.status(200).send({message:"Submitted"});
//         }
//     } catch(err) {
//         console.log(err);
//         return res.status(422).send({error: err.message});
//     }
//      }); 

router.post('/submitassigns',  upload.array('uplassign',4),async (req,res,next) =>
{

    let reqFiles = [];
    const url = req.protocol+ '://' +req.get('host');
    for (let i=0;i<req.files.length;i++)
    { 
        reqFiles.push(url +'/student-assignments/'+ req.files[i].filename)
    }
    
    const submitted = Boolean(req.body.submitted);
    const submittedString = submitted.toString();
    
    try {
        // Check if a document already exists for this assignment_id and student
        const existingDoc = await StudentAssignments.findOne({ assignment_id: req.body.assignment_id, student: req.body.student });
        if (existingDoc) {
            // Assignment has already been submitted by this student for this assignment_id, don't add it to the database
            res.status(200).json({message: "Already Submitted"});
        } else {
            // Assignment has not been submitted by this student for this assignment_id, add it to the database
            const stdAss = new StudentAssignments({   
                campname: req.body.campname,
                student_name : req.body.student_name,
                title: req.body.title,
                description: req.body.description,
                tmarks:req.body.tmarks,
                duedate:req.body.duedate,
                submitted_date:req.body.submitted_date,
                uplassign:reqFiles,
                assignment_id:req.body.assignment_id,
                student: req.body.student,
                submit_status: req.body.submit_status,
            });
            await stdAss.save();
            res.status(200).json({message:"Submitted"});
        }
    } catch(err) {
        console.log(err);
        return res.status(422).json({message: "Error"});
    }
});


    router.get('/getsameass/:teacherAssignmentId',StudentAssignmentsController.GetSubmittedAssignments)

    router.get('/gettchassigns',StudentAssignmentsController.GetAssignments);

    router.get('/singletchassign/:id', StudentAssignmentsController.GetSingleAssignment);

    router.put('/updatetchassigns/:id' , StudentAssignmentsController.UpdateAssignments);

    router.delete('/deletetchassigns/:id', StudentAssignmentsController.DeleteAssignments);

    module.exports = router;