const express = require('express');
const https = require('https');
const Teacher = require('../Models/teacher.model')

const jwt = require('jsonwebtoken');
const router = express.Router()

const session = require('express-session');
const app = express();
// set up session middleware
app.use(session({
  secret: 'my-secret-key', // change this to a random string
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // set secure:true for HTTPS
}));

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
        res.status(401).json({message: "Invalid Credentials"})
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
    
    // const SetDeleteTeacherId = (req, res, next) => {
    //   req.session.teacher_delid = req.query.id;
    //   res.sendStatus(200);
    // };

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

    // const AddCampname = (req,res,next) => {
    //   const {campname} = req.body;
    //   const teacherID = req.params.id;
    
    //   Teacher.findByIdAndUpdate({_id: teacherID}, {campname:campname}).exec((err, result) => {
    //     if(err) res.status(500).send({message: err.message});
    //     else {
    //       res.status(200).send(result);
    //          }
    //     })
    //   }
    

exports.AddTeacher=AddTeacher;
exports.VerifyLogin=VerifyLogin;
exports.GetTeachers = GetTeachers;
exports.GetSingleTeacher = GetSingleTeacher;
exports.UpdateTeacher = UpdateTeacher;
exports.DeleteTeacher = DeleteTeacher;
//exports.SetDeleteTeacherId = SetDeleteTeacherId;
//exports.AddCampname = AddCampname;
//exports.AddFollowing = AddFollowing;
//exports.AddFollow = AddFollow;