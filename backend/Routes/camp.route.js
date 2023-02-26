const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Camp = require('../Models/camp.model')
const CampController = require('../Controllers/camp.controller')
const StudentController = require('../Controllers/student.controller')

router.post('/addcampteachers',CampController.VerifyAndAddCampTeachers);

router.post('/addcampstudents',CampController.VerifyAndAddCampStudents)

router.post('/addcamp1',CampController.AddCamp1);

//router.post('/addcampname',CampController.AddCampname)

router.get('/getcamps',CampController.GetCamps);

router.get('/getcamp/:id',CampController.GetSingleCamp);

router.get('/getcampname',CampController.GetCampName)

router.get('/getcampteacher/:id',CampController.GetCampForTeacher);

router.get('/getcampstudent/:id',CampController.GetCampForStudent);

router.delete('/deletecamp/:id',CampController.DeleteCamp)
module.exports = router;