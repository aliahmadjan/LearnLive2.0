const express = require('express');
const https = require('https');
const Admin = require('../Models/admin.model')

const jwt = require('jsonwebtoken');

//const requireLogin = require('../Middleware/UserToken.js')
const router = express.Router()

const AddAdmin = (req,res,next) =>  
{
     const { name ,email,gender,phoneno,password,cpassword} = req.body;
     console.log(name);
     if(!name || !email || !gender || !phoneno || !password || !cpassword)
     {
        return res.status(422).send("Please Fill ALl the fields");
     }

     Admin.findOne({email:email})
     .then(
      async(savedUser) => {
        if(savedUser)
        {
          return res.status(422).send({error: "Invalid Credentials"});
        }
        const admin = new Admin({
          name,
          email,
          gender,
          phoneno,
          password,
          cpassword,
        })
        try{
          await admin.save();
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
    const log= await Admin.findOne({email:email , password:password})
   
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

const GetAdmins = async(req,res,next) =>
{
     Admin.find((error,data) => {
        if(error)
        {
            res.send("Could Not Get Admins")
        }
        else 
         {
            res.json(data)
         }
    })
}

const GetSingleAdmin= async(req,res,next) => 
{
   Admin.findById(req.params.id , (error,data) =>
    {
        if(error){
            res.send("Not Found!");
        }
        else {
            res.json(data)
        }
    })
}

const UpdateAdmin = async(req,res,next) =>
{
   Admin.findByIdAndUpdate(req.params.id, {
        $set: req.body
          }, (error, data) => {
            if (error) {
              res.send("Error")
              console.log(error)
            } else {
              res.json(data)
              console.log('Admin updated successfully !')
            }
          })
    }
    
    const DeleteAdmin = async(req,res,next) =>
    {
       Admin.findByIdAndDelete(req.params.id,(error,data)=> {
            if(error){
                return next(error);
            }
            else {
               // res.send("Admin Deleted Successfully!")
                res.status(200).json({
                    msg:data
                })
            }
        })
    }

    

exports.AddAdmin=AddAdmin
exports.VerifyLogin=VerifyLogin;
exports.GetAdmins = GetAdmins;
exports.GetSingleAdmin = GetSingleAdmin;
exports.UpdateAdmin = UpdateAdmin;
exports.DeleteAdmin = DeleteAdmin;