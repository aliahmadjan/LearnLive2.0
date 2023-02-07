const express = require('express');
const https = require('https');
const Student = require('../Models/student.model')

const jwt = require('jsonwebtoken');

//const requireLogin = require('../Middleware/UserToken.js')
const router = express.Router()

const AddStudent = (req,res,next) =>  
{
     const { name ,email,gender,phoneno,password,cpassword} = req.body;
     console.log(name);
     if(!name || !email || !gender || !phoneno || !password || !cpassword)
     {
        return res.status(422).send("Please Fill ALl the fields");
     }

     Student.findOne({email:email})
     .then(
      async(savedUser) => {
        if(savedUser)
        {
          return res.status(422).send({error: "Invalid Credentials"});
        }
        const student = new Student({
          name,
          email,
          gender,
          phoneno,
          password,
          cpassword,
        })
        try{
          await student.save();
          //res.send({message: "User Saved Successfully"})
          //const token = jwt.sign({_id: user.id}, process.env.SECRET_KEY_USER);
        //console.log(token);
        //res.send({token});
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
    const log= await Student.findOne({email:email , password:password})
   
      if(log)
      {
         //res.status(201).json(log)
        // const token = jwt.sign({_id: student.id}, process.env.SECRET_KEY_STUDENT);
        // console.log(token);
        // res.send({token});

         token = await  log.generateAuthToken();
          console.log(token);
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

const GetStudents = async(req,res,next) =>
{
     Student.find((error,data) => {
        if(error)
        {
            res.send("Could Not Get Students")
        }
        else 
         {
            res.json(data)
         }
    })
}

const GetSingleStudent = async(req,res,next) => 
{
  var x = req.query.id; // for getting single id for editing
 // console.log(x);
    Student.findById(x , (error,data) =>
    {
        if(error){
            res.send("Not Found!");
        }
        else {
            res.json(data)
        }
    })
}

const UpdateStudent = async(req,res,next) =>
{
  Student.findByIdAndUpdate(req.params.id, {
    $set: req.body
      }, (error, data) => {
        if (error) {
          res.send("Error")
          console.log(error)
        } else {
          res.json(data)
          console.log('Student updated successfully !')
        }
      })
    }
    
    const DeleteStudent =(req,res,next) =>
    {
       Student.findByIdAndDelete(req.params.id,(error,data)=> {
            if(error){
                return next(error);
            }
            else {
                //res.send("Student Deleted Successfully!")
                res.status(200).json({
                    msg:data
                })
            }
        })
    }

    //Get All Veterans On Search
// router.post("/getveterans", AuthToken, async (req, res) => {
//   const savedUser = await Veteran.find({
//     name: { $regex: req.body.search, $options: "i", $nin: [req.user.name] },
//   }); 
//   res.send(savedUser);
// });
    

exports.AddStudent=AddStudent;
exports.VerifyLogin=VerifyLogin;
exports.GetStudents = GetStudents;
exports.GetSingleStudent = GetSingleStudent;
exports.UpdateStudent = UpdateStudent;
exports.DeleteStudent = DeleteStudent;
//exports.AddFollowing = AddFollowing;
//exports.AddFollow = AddFollow;