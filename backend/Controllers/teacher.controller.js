const express = require('express');
const https = require('https');
const Teacher = require('../Models/teacher.model')

const jwt = require('jsonwebtoken');
const router = express.Router()

const AddTeacher = (req,res,next) =>  
{
     const { name ,email,gender,phoneno,password,cpassword} = req.body;
     if(!name || !email || !gender || !phoneno || !password || !cpassword)
     {
        return res.status(422).send("Please Fill ALl the fields");
     }

     Teacher.findOne({email:email})
     .then(
      async(savedUser) => {
        if(savedUser)
        {
          return res.status(422).send({error: "Invalid Credentials"});
        }
        const teacher = new Teacher({
          name,
          email,
          gender,
          phoneno,
          password,
          cpassword,
        })
        try{
          await teacher.save();
          res.send({message: "Teacher Created Successfully"})
          const token = jwt.sign({_id: teacher.id}, process.env.SECRET_KEY_TEACHER);
        //console.log(token);
        res.send({token});
        }
        catch (err)
        {
          return res.status(422).send({error: "Cannot login"});
        }
    
      }   
     )
    }
    



const VerifyLogin = async(req,res,next) =>
{
   try{
    let token;
    const email=req.body.email;
    const password = req.body.password;
    const log=  await Teacher.findOne({email:email , password:password})
    
      if(log)
      {
       //res.status(201).json(log)
        //const token = jwt.sign({_id: user.id}, process.env.SECRET_KEY_TEACHER);
        // console.log(token);
         //res.send({token});

          token = await log.generateAuthToken();
          //console.log(token);
          res.send(token);
      }
      else
      {
        res.status(401).json("Username or Password not found!")
      }
  
  }
   catch (err){
    console.log(err);
} 

}

const GetTeachers = async(req,res,next) =>
{
     Teacher.find((error,data) => {
        if(error)
        {
            res.send("Could Not Get Teachers")
        }
        else 
         {
            res.json(data)
         }
    })
}

const GetSingleTeacher = async(req,res,next) => 
{
    var x = req.query.id; // for getting single id for editing
    //console.log(x);
    Teacher.findById(x, (error,data) =>
    {
        if(error){
            res.send("Not Found!");
        }
        else {
            res.json(data)
        }
    })
}

const UpdateTeacher = async(req,res,next) =>
{
  Teacher.findByIdAndUpdate(req.params.id, {
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
    
    const DeleteTeacher = (req,res,next) =>
    {
    var x= req.query.id;
        Teacher.findByIdAndDelete(req.params.id,(error,data)=> {
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

    

exports.AddTeacher=AddTeacher;
exports.VerifyLogin=VerifyLogin;
exports.GetTeachers = GetTeachers;
exports.GetSingleTeacher = GetSingleTeacher;
exports.UpdateTeacher = UpdateTeacher;
exports.DeleteTeacher = DeleteTeacher;
//exports.AddFollowing = AddFollowing;
//exports.AddFollow = AddFollow;