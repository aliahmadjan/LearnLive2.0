const express = require('express');
const https = require('https');
const Camp = require('../Models/camp.model');
const Teacher = require('../Models/teacher.model')
const Student = require('../Models/student.model')

const jwt = require('jsonwebtoken');
const router = express.Router()

const VerifyAndAddCampTeachers =  async(req,res,next) =>
{
  const { campname, teachers, students } = req.body;
  const teacherID = req.params.id;
  try {
    const teacher = await Teacher.findOne({ _id: teacherID, campname: campname });
    if (teacher) {
      // The teacher is already added to the camp.
     // res.status(200).json(student);
      res.status(200).json({ message: "Already Assigned" });
    } else {
      // The student is not added to the camp, so add them along with the teacher.
      const result = await Camp.updateOne(
        { campname: campname },
        { $push: { teachers: teachers, students: students } }
      );
      // Add the campname to the student's campname array.
      await Teacher.findByIdAndUpdate(
        { _id: teacherID },
        { $push: { campname: campname } }
      );
      res.status(200).json({ message: "Assigned" });
      //res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "Error"});
  }
    
}
const VerifyAndAddCampStudents = async (req, res, next) => {
  const { campname, teachers, students } = req.body;
  const studentID = req.params.id;
  try {
    const student = await Student.findOne({ _id: studentID, campname: campname });
    if (student) {
      // The student is already added to the camp.
      res.status(200).json({message: "Already Assigned"});
    } else {
      // The student is not added to the camp, so add them along with the teacher.
      const result = await Camp.updateOne(
        { campname: campname },
        { $push: { teachers: teachers, students: students } }
      );
      // Add the campname to the student's campname array.
      await Student.findByIdAndUpdate(
        { _id: studentID },
        { $push: { campname: campname } }
      );
      res.status(200).json({message: "Assigned"});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
};



const AddCamp = async (req, res, next) => {
  const { campname, startdate, enddate } = req.body;

  try {
    const camp = await Camp.findOne({ campname});
    if (camp) {
      // Camp already exists
      res.status(200).json({message: "Already Exists"});
    } else {
      // The camp does not exist, so add a new camp.
      const newCamp = new Camp({
        campname: req.body.campname,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
      });

      await newCamp.save();
      res.status(200).send({message: "Added"});
    }
  } catch (err) {
    //console.log(err);
    return res.status(422).send({ message: "Error" });
  }
};

    

const GetCamps = async(req,res,next) =>
{
    Camp.find({}).populate(["teachers", "students"]).exec((err, data) => {
		if(err) res.status(500).send({message: err.message});
		else res.status(200).send(data);
	});
}

const GetCampForTeacher = async(req,res,next) =>
{
  const camps = await Camp.find()
  const arr = []
  for(let i=0; i<camps.length; i++)
  {
    for(let j=0; j<camps[i].teachers.length; j++)
    {
      //console.log(camps[i].teachers[j].toHexString())
      if (req.params.id === camps[i].teachers[j].toHexString())
      {
        arr.push(camps[i].campname)
        //console.log(camps[i].campname)
      }
    }
  }
  res.send(arr)
  }

  const GetCampForStudent = async(req,res,next) =>
  {
    const camps = await Camp.find()
    const arr = []
    for(let i=0; i<camps.length; i++)
    {
      for(let j=0; j<camps[i].students.length; j++)
      {
        //console.log(camps[i].teachers[j].toHexString())
        if (req.params.id === camps[i].students[j].toHexString())
        {
          arr.push(camps[i].campname)
          //console.log(camps[i].campname)
        }
      }
    }
    res.send(arr)
    }
  
  
const GetSingleCamp = (req,res,next) => 
{
  var x = req.query.id; // for getting single id for editing
 // console.log(x);
    Camp.findById(x).populate(["startdate","enddate","teachers","students"]).exec((err,data) =>
    {
    if(err)
     { 
      res.status(500).send({message: err.message});
     }
     else
     { 
      res.status(200).send(data);
     }
     })
}

const GetCampName = async(req,res,next) =>
{
  
  const arr = []
 const campObj = await Camp.find() 
 for (var i=0;i< campObj.length ; i++)
 {
  arr.push(campObj[i].campname);
  
 }
 //console.log(arr)
  res.send(arr);
  //console.log(campObj);

}

const AddCampname = (req,res,next) => {
  const {campname} = req.body;
  const studentID = req.params.id;

  Student.findByIdAndUpdate({_id: studentID}, {campname:campname}).exec((err, result) => {
    if(err) res.status(500).send({message: err.message});
    else {
      res.status(200).send(result);
         }
    })
  }

   

  const DeleteCamp = (req,res,next) =>
    {
    var x= req.query.id;
        Camp.findByIdAndDelete(req.params.id,(error,data)=> {
            if(error){
                return next(error);
            }
            else {
                //res.send("Teacher Deleted Successfully!")
                res.status(200).json({
                    msg:data
                })
            }
        })
    }

    const GetCampDataForCertificate = async (req, res, next) => {
      const studentID = req.params.studentID;
      const student = await Student.findById(studentID);
      const camps = await Camp.find();
      const arr = [];
    
      for (let i = 0; i < camps.length; i++) {
        if (student.campname.includes(camps[i].campname)) {
          arr.push(camps[i]);
        }
      }
    
      res.send(arr);
    }

exports.VerifyAndAddCampTeachers = VerifyAndAddCampTeachers;
exports.VerifyAndAddCampStudents = VerifyAndAddCampStudents;
exports.AddCamp = AddCamp;
exports.GetCamps = GetCamps;
exports.GetSingleCamp = GetSingleCamp;
exports.GetCampName = GetCampName;
exports.GetCampForTeacher = GetCampForTeacher;
exports.GetCampForStudent= GetCampForStudent
exports.AddCampname = AddCampname
exports.DeleteCamp = DeleteCamp
exports.GetCampDataForCertificate = GetCampDataForCertificate
