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
       if (req.student.campname.includes(tchass[i].campname))
       {
        arr.push(tchass[i])
      }
  }
  res.send(arr)
})
router.get('/lateststdassign', TokenStudent, async (req, res) => {
  const latestDate = await TeacherAssignments.find({}, { uploadeddate: 1 }).sort({ uploadeddate: 'desc' }).limit(1);

  if (latestDate.length === 0) {
    return res.status(404).send('No assignments found');
  }

  const latestAssignments = await TeacherAssignments.find({ uploadeddate: latestDate[0].uploadeddate });

  if (latestAssignments.length === 0) {
    return res.status(404).send('No assignments found for your camp');
  }

  const filteredAssignments = latestAssignments.filter(assignment => req.student.campname.includes(assignment.campname));

  if (filteredAssignments.length === 0) {
    return res.status(404).send('No assignments found for your camp');
  }

  res.send(filteredAssignments);
});

    //router.put('/updatetchassigns/:id' , TeacherAssignmentsController.UpdateAssignments);

    router.put('/updatetchassigns/:id', upload.array('uplassign', 4), async (req, res, next) => {
        try {
          let reqFiles = [];
          const url = req.protocol + '://' + req.get('host');
          for (let i = 0; i < req.files.length; i++) {
            reqFiles.push(url + '/teacher-assignments/' + req.files[i].filename)
          }
      
          const updatedAssignment = await TeacherAssignments.findByIdAndUpdate(
            { _id: req.params.id }, // find the document with the given ID
            {
              campname: req.body.campname,
              title: req.body.title,
              description: req.body.description,
              tmarks: req.body.tmarks,
              uploadeddate: req.body.uploadeddate,
              duedate: req.body.duedate,
              uplassign: reqFiles,
            },
            { new: true } // return the updated document
          );
      
          res.send(updatedAssignment);
        } catch (err) {
          console.log(err);
          return res.status(422).send({ error: err.message });
        }
      });
      

    router.delete('/deletetchassigns/:id', TeacherAssignmentsController.DeleteAssignments);

    module.exports = router;