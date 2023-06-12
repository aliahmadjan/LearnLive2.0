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

   // Check if the campname is valid and exists in the database
   const camp = await Camp.findOne({ campname: campname });
   if (!camp) {
     return res.status(400).json({ error: 'Invalid campname' });
   }

   // The student is not added to the camp, so add them along with the teacher.
   const result = await Camp.updateOne(
     { campname: campname },
     { $push: { teachers: teachers, students: students } }
   );

   // Add the campname to the student's campname array.
   await Student.findByIdAndUpdate(
             { _id: studentID },
              { $push: { campname: campname } , $inc: {frequency: 1} }
            );
            res.status(200).json({message: "Assigned"});
 };




const AddCamp = async (req, res, next) => {
  const { campname, startdate, enddate } = req.body;

  //try {
    //const camp = await Camp.findOne({ campname});
    // if (camp) {
    //   // Camp already exists
    //   res.status(200).json({message: "Already Exists"});
    // } else {
      // The camp does not exist, so add a new camp.
      const newCamp = new Camp({
        campname: req.body.campname,
        camp_level : req.body.camp_level,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
      });

      await newCamp.save();
      res.status(200).send({message: "Added"});
    //}
  //} catch (err) {
    //console.log(err);
    //return res.status(422).send({ message: "Error" });
  }


    

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

const UpdateCamp = async(req,res,next) =>
{
  Camp.findByIdAndUpdate(req.params.id, {
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

const GetCampName = async(req,res,next) =>
{
  
  const arr = []
 const campObj = await Camp.find() 
 for (var i=0;i< campObj.length ; i++)
 {
  arr.push({campname: campObj[i].campname , camp_level:campObj[i].camp_level});
  
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

    const RemoveTeacherFromCamp = async (req, res, next) => {
      const { campname } = req.body;
      const teacherID = req.params.id;
      const campName = req.params.campName;
      
    
      try {
        // Remove the teacher from the camp.
        await Camp.findOneAndUpdate(
          { campname: campName },
          { $pull: { teachers: teacherID } },
          { new: true }
        );
    
        // Remove the campname from the teacher's campnames array.
        await Teacher.findByIdAndUpdate(
          teacherID,
          { $pull: { campname: campName } },
          { new: true }
        );
    
        res.status(200).json({ message: "Teacher removed from camp" });
      } catch (err) {
        console.log(err);
        res.status(500).json("Error");
      }
    };

    const RemoveStudentFromCamp = async (req, res, next) => {
      const { campname } = req.body;
      const studentID = req.params.id;
      const campName = req.params.campName;
      
    
      try {
        // Remove the teacher from the camp.
        await Camp.findOneAndUpdate(
          { campname: campName },
          { $pull: { students: studentID } },
          { new: true }
        );
    
        // Remove the campname from the teacher's campnames array.
        await Student.findByIdAndUpdate(
          studentID,
          { $pull: { campname: campName } , $inc: {frequency: -1}},
          { new: true }
        );
    
        res.status(200).json({ message: "Student removed from camp" });
      } catch (err) {
        console.log(err);
        res.status(500).json("Error");
      }
    };
    
    
    
    
    
    

exports.VerifyAndAddCampTeachers = VerifyAndAddCampTeachers;
exports.VerifyAndAddCampStudents = VerifyAndAddCampStudents;
exports.AddCamp = AddCamp;
exports.GetCamps = GetCamps;
exports.GetSingleCamp = GetSingleCamp;
exports.UpdateCamp = UpdateCamp;
exports.GetCampName = GetCampName;
exports.GetCampForTeacher = GetCampForTeacher;
exports.GetCampForStudent= GetCampForStudent
exports.AddCampname = AddCampname
exports.DeleteCamp = DeleteCamp
exports.GetCampDataForCertificate = GetCampDataForCertificate
exports.RemoveTeacherFromCamp = RemoveTeacherFromCamp
exports.RemoveStudentFromCamp = RemoveStudentFromCamp


