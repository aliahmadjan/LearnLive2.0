const express = require('express');
const https = require('https');
const Student = require('../Models/student.model')

const jwt = require('jsonwebtoken');

//const requireLogin = require('../Middleware/UserToken.js')
const router = express.Router()

const AddStudent = async (req, res, next) => {
  try {
    const {
      name,
      email,
      age,
      gender,
      phoneno,
      parents_profession,
      city,
      country,
      frequency,
      differently_abled,
      hours,
      grouped_hours,
      one_to_one,
      password,
      cpassword,
    } = req.body;

    // Check if the student with the same email already exists
    const existingStudent = await Student.findOne({ email: email });
    if (existingStudent) {
      return res.status(422).send({ error: "Invalid Credentials" });
    }

    // Create a new student instance
    const student = new Student({
      name,
      email,
      age,
      gender,
      phoneno,
      parents_profession,
      city,
      country,
     
      frequency,
      differently_abled,
      hours,
      grouped_hours,
      one_to_one,
      password,
      cpassword,
    });

    // Save the student to the database
    await student.save();

    return res.status(200).send({ message: "Student Added Successfully" });
  } catch (err) {
    console.error(err);
    return res.status(422).send({ error: "Cannot login" });
  }
};
    



const VerifyLogin = async(req,res,next) =>
{
   try{
    let token;
    const email=req.body.email;
    const password = req.body.password;
    const log= await Student.findOne({email:email , password:password})
   
      if(log)
      {
        // res.status(201).json(log)
         //const token = jwt.sign({_id: student.id}, process.env.SECRET_KEY_STUDENT);
        // console.log(token);
         //res.send({token});

         token = await  log.generateAuthToken();
         // console.log(token);
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

    // const AddCampname = (req,res,next) => {
    //   const {campname} = req.body;
    //   const studentID = req.params.id;
    
    //   Student.findByIdAndUpdate({_id: studentID}, {campname:campname}).exec((err, result) => {
    //     if(err) res.status(500).send({message: err.message});
    //     else {
    //       res.status(200).send(result);
    //          }
    //     })
    //   }

      const AddCampname = (req, res, next) => {
        const { campname } = req.body;
        const studentID = req.params.id;
      
        Student.findByIdAndUpdate(
          { _id: studentID },
          { $push: { campname: campname } }
        ).exec((err, result) => {
          if (err) res.status(500).send({ message: err.message });
          else {
            res.status(200).send(result);
          }
        });
      };
      
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
//exports.AddCampname = AddCampname;
//exports.AddFollowing = AddFollowing;
//exports.AddFollow = AddFollow;