const express = require('express');
const mime = require('mime-types');

const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const {v4: uuidv4} = require('uuid')
const TeacherAssignments = require('../Models/teacher-assignments.model')
const TeacherAssignmentsController  = require('../Controllers/teacher-assignments.controller')
const TokenTeacher = require('../Middleware/TeacherToken');
const TokenStudent = require('../Middleware/StudentToken');



const app = express();

const DIR = './teacher-assignments/';

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

// var upload =multer({
//     storage: storage,
//     fileFilter: (req,file,cb) => {
//         if(file.mimetype == "image/png" ||  file.mimetype =="application/pdf" || file.mimetype =="image/jpg" || file.mimetype == "image/jpeg" 
//         || file.mimetype == "application/zip")
//         {
//             cb(null,true);
//         }
//         else
//         {
//             cb(null,false);
//             return cb(new Error('Only .pdf .png .jpg .jpeg and .zip format allowed!'));
//         }
//     }
// });



var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/png', 'application/pdf', 'image/jpg', 'image/jpeg', 'application/zip',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        const fileMimeType = mime.lookup(file.originalname);

        if (allowedMimeTypes.includes(fileMimeType)) {
            cb(null, true);
        } else {
            cb(new Error('Only .pdf .png .jpg .jpeg and .zip format allowed!'));
        }
    }
});




router.post('/uploadassigns',  upload.array('uplassign',4),async (req,res,next) =>
{
   
    let reqFiles = [];
    const url = req.protocol+ '://' +req.get('host');
    for (let i=0;i<req.files.length;i++)
    { 
        reqFiles.push(url +'/teacher-assignments/'+ req.files[i].filename)
    }

        const tchAss = new TeacherAssignments({   
            campname: req.body.campname,
          title: req.body.title,
          description: req.body.description,
          tmarks:req.body.tmarks,
          uploadeddate:req.body.uploadeddate,
          duedate:req.body.duedate,
           uplassign:reqFiles,
           teacher: req.body.teacher,  
        });
        try{
            await tchAss.save();
            res.send(tchAss);
        }
        catch(err)
        {
            console.log(err);
            return res.status(422).send({error: err.message});
        }
    }); 

    router.get('/gettchassigns',TeacherAssignmentsController.GetAssignments);

    router.get('/singletchassign/:id', TeacherAssignmentsController.GetSingleAssignment);

    router.get('/getcurrassigns',TokenTeacher, async(req,res)=>
{
  //console.log(req.teacher._id.toHexString())
  const tchass =  await TeacherAssignments.find()
  const arr = []
   for(let i=0; i<tchass.length; i++)
   {
       if (req.teacher._id.toHexString() === tchass[i].teacher)
       {
       
        arr.push(tchass[i] )      
      }
  }
  res.send(arr)
})

router.get('/samestdassign',TokenStudent, async(req,res)=>
{
  const tchass =  await TeacherAssignments.find()
    const arr= [];
    for(let i=0; i<tchass.length; i++)
   {
       if (req.student.campname === tchass[i].campname)
       {
        arr.push(tchass[i])
      }
  }
  res.send(arr)
})


    router.put('/updatetchassigns/:id' , TeacherAssignmentsController.UpdateAssignments);

    router.delete('/deletetchassigns/:id', TeacherAssignmentsController.DeleteAssignments);

    module.exports = router;