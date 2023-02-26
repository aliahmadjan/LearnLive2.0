const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const {v4: uuidv4} = require('uuid')
const Teacher = require('../Models/teacher.model')
const TeacherController = require('../Controllers/teacher.controller')

const DIR = './teacher/';

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



router.post('/addteacher',  upload.single('profileimg'),async (req,res,next) =>
{
   
    const url = req.protocol+ '://' +req.get('host')

    if(!req.file)
    {
        const teacher = new Teacher ({
            
            name: req.body.name,
            email:req.body.email,
            gender: req.body.gender,
            phoneno: req.body.phoneno,
            password: req.body.password,
            cpassword: req.body.cpassword,
            campname:req.body.campname,
            
        });
        try{
            await teacher.save();
            res.send(teacher);
        }
        catch(err)
        {
            console.log(err);
            return res.status(422).send({error: err.meessage});
        }
    }
    else{
        const teacher = new Teacher({
            name: req.body.name,
            email:req.body.email,
            gender: req.body.gender,
            phoneno: req.body.phoneno,
            password: req.body.password,
            cpassword: req.body.cpassword,
            
            profileimg: url + "/teacher/" +req.file.filename,
            campname:req.body.campname,
        });
        try{
            await teacher.save();
            res.send(teacher);
        }
        catch(err)
        {
            console.log(err);
            return res.status(422).send({error: err.meessage});
        }
    }
    }); 



//router.post('/addteacher',TeacherController.AddTeacher)

router.post('/verifylogin',TeacherController.VerifyLogin)

router.post('/addcampname/:id',TeacherController.AddCampname);

router.get('/getteachers',TeacherController.GetTeachers)

router.get('/getteacher/:id',TeacherController.GetSingleTeacher)

router.put('/updateteacher/:id',TeacherController.UpdateTeacher)

router.delete('/deleteteacher/:id',TeacherController.DeleteTeacher)

//router.get('/setdeleteteacherid/:teacher_delid',TeacherController.SetDeleteTeacherId);

module.exports = router;