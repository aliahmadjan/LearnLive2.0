const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const {v4: uuidv4} = require('uuid')
const Student = require('../Models/student.model')
const StudentController = require('../Controllers/student.controller')


const DIR = './student/';

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



router.post('/addstudent',  upload.single('profileimg'),async (req,res,next) =>
{
   
    const url = req.protocol+ '://' +req.get('host')

    if(!req.file)
    {
        const student = new Student ({
            
            name: req.body.name,
            email:req.body.email,
            age: req.body.age,
            gender: req.body.gender,
            phoneno: req.body.phoneno,
            parents_profession: req.body.parents_profession,
            city : req.body.city,
            country : req.body.country,
            differently_abled: req.body.differently_abled,
            hours: req.body.hours,
            grouped_hours: req.body.grouped_hours,
            one_to_one : req.body.one_to_one,
            password: req.body.password,
            cpassword: req.body.cpassword,
            campname: req.body.campname,
            
        });
        try{
            await student.save();
            res.send(student);
        }
        catch(err)
        {
            console.log(err);
            return res.status(422).send({error: err.meessage});
        }
    }
    else{
        const student = new Student({
            name: req.body.name,
            email:req.body.email,
            age: req.body.age,
            gender: req.body.gender,
            phoneno: req.body.phoneno,
            parents_profession: req.body.parents_profession,
            city : req.body.city,
            country : req.body.country,
            differently_abled: req.body.differently_abled,
            hours: req.body.hours,
            grouped_hours: req.body.grouped_hours,
            one_to_one : req.body.one_to_one,
            password: req.body.password,
            password: req.body.password,
            cpassword: req.body.cpassword,
            profileimg: url + "/student/" +req.file.filename,
            campname: req.body.campname,
        });
        try{
            await student.save();
            res.send(student);
        }
        catch(err)
        {
            console.log(err);
            return res.status(422).send({error: err.meessage});
        }
    }
    }); 


//router.post('/addstudent',StudentController.AddStudent)

router.post('/verifylogin',StudentController.VerifyLogin)

//router.post('/addcampname/:id',StudentController.AddCampname);

router.get('/getstudents',StudentController.GetStudents)

router.get('/getstudent/:id',StudentController.GetSingleStudent)

router.put('/updatestudent/:id',StudentController.UpdateStudent)

router.delete('/deletestudent/:id',StudentController.DeleteStudent)


module.exports = router;