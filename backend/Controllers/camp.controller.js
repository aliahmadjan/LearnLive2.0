const express = require('express');
const https = require('https');
const Camp = require('../Models/camp.model');
const Student = require('../Models/student.model')

const jwt = require('jsonwebtoken');
const router = express.Router()

const VerifyAndAddCampTeachers =  async(req,res,next) =>
{
        const {campname, teachers , students} = req.body;
        try{
          const camp= await Camp.findOne({campname:campname, teachers:teachers})
        
        if (camp) {
          //console.log("Teacher is present in the camp");
          res.status(200).json(camp);
      }
      else {
        //console.log("Teacher not found in the camp, adding the teacher...");
        Camp.updateOne({"campname" : campname}, {$push: {teachers: teachers , students:students}}).exec((err, result) => {
            if(err) res.status(500).send({message: err.message});
            else {
                res.status(200).send(result);
            }
        }) 
      }
    }
    catch (err) {
      console.log(err);
      res.status(500).json("Internal server error");
     }
    
}

const VerifyAndAddCampStudents =  async(req,res,next) =>
{
        const {campname, teachers , students} = req.body;
        try{
          const camp= await Camp.findOne({campname:campname, students:students})
        
        if (camp) {
          //console.log("Teacher is present in the camp");
          res.status(200).json(camp);
      }
      else {
        //console.log("Teacher not found in the camp, adding the teacher...");
        Camp.updateOne({"campname" : campname}, {$push: {teachers: teachers , students:students}}).exec((err, result) => {
            if(err) res.status(500).send({message: err.message});
            else {
                res.status(200).send(result);
            }
        }) 
      }
    }
    catch (err) {
      console.log(err);
      res.status(500).json("Internal server error");
     }
    
}

const AddCamp1 = (req,res,next) =>
{
    const camp = new Camp({   
          campname : req.body.campname,
          startdate: req.body.startdate,
          enddate: req.body.enddate,
        
        });
        try{
            camp.save();
            res.send(camp);
        }
        catch(err)
        {
            console.log(err);
            return res.status(422).send({error: err.message});
        }
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

exports.VerifyAndAddCampTeachers = VerifyAndAddCampTeachers;
exports.VerifyAndAddCampStudents = VerifyAndAddCampStudents;
exports.AddCamp1 = AddCamp1;
exports.GetCamps = GetCamps;
exports.GetSingleCamp = GetSingleCamp;
exports.GetCampName = GetCampName;
exports.GetCampForTeacher = GetCampForTeacher;
exports.GetCampForStudent= GetCampForStudent
exports.AddCampname = AddCampname
exports.DeleteCamp = DeleteCamp