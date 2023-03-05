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



router.post('/submitassigns',  upload.array('uplassign',4),async (req,res,next) =>
{

        const {campname, student_name , title, description,tmarks, 
            duedate , uplassign , assignment_id , student} = req.body

            const stdAssign = await StudentAssignments.findOne({campname: campname,
                student_name: student_name, title: title, description 
   : description, tmarks:tmarks, duedate: duedate, uplassign: uplassign, assignment_id: assignment_id,
   student:student})

   if (stdAssign) {
    // Student Assignment exists 
    res.status(200).json(stdAssign);
  }
  else
  {
    let reqFiles = [];
    const url = req.protocol+ '://' +req.get('host');
    for (let i=0;i<req.files.length;i++)
    { 
        reqFiles.push(url +'/student-assignments/'+ req.files[i].filename)
    }

        const stdAss = new StudentAssignments({   
            campname: req.body.campname,
            student_name : req.body.student_name,
          title: req.body.title,
          description: req.body.description,
          tmarks:req.body.tmarks,
          duedate:req.body.duedate,
           uplassign:reqFiles,
           assignment_id:req.body.assignment_id,
           student: req.body.student
        });
        try{
            await stdAss.save();
            res.send(stdAss);
        }
        catch(err)
        {
            console.log(err);
            return res.status(422).send({error: err.message});
        }

    }
    }); 

    router.get('/getsameass/:teacherAssignmentId',StudentAssignmentsController.GetSubmittedAssignments)

    router.get('/gettchassigns',StudentAssignmentsController.GetAssignments);

    router.get('/singletchassign/:id', StudentAssignmentsController.GetSingleAssignment);

    router.put('/updatetchassigns/:id' , StudentAssignmentsController.UpdateAssignments);

    router.delete('/deletetchassigns/:id', StudentAssignmentsController.DeleteAssignments);

    module.exports = router;