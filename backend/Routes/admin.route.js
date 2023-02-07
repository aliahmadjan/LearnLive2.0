const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const Admin = require('../Models/admin.model')
const AdminController = require('../Controllers/admin.controller')
const {v4: uuidv4} = require('uuid')


const DIR = './admin/';

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



router.post('/addadmin',  upload.single('profileimg'),async (req,res,next) =>
{
   
    const url = req.protocol+ '://' +req.get('host')

    if(!req.file)
    {
        const admin = new Admin ({
            
            name: req.body.name,
            email:req.body.email,
            gender: req.body.gender,
            phoneno: req.body.phoneno,
            password: req.body.password,
            cpassword: req.body.cpassword,
            
        });
        try{
            await admin.save();
            res.send(admin);
        }
        catch(err)
        {
            console.log(err);
            return res.status(422).send({error: err.meessage});
        }
    }
    else{
        const admin = new Admin({
            name: req.body.name,
            email:req.body.email,
            gender: req.body.gender,
            phoneno: req.body.phoneno,
            password: req.body.password,
            cpassword: req.body.cpassword,
            profileimg: url + "/admin/" +req.file.filename,
        });
        try{
            await admin.save();
            res.send(admin);
        }
        catch(err)
        {
            console.log(err);
            return res.status(422).send({error: err.meessage});
        }
    }
    }); 

//router.post('/addadmin',AdminController.AddAdmin)

router.post('/verifylogin',AdminController.VerifyLogin)

router.get('/getadmins',AdminController.GetAdmins)

router.get('/getadmin/:id',AdminController.GetSingleAdmin)

router.put('/updateadmin/:id',AdminController.UpdateAdmin)

//router.put('/updatepassword/:id', AdminController.UpdatePassword)

router.delete('/deleteadmin/:id',AdminController.DeleteAdmin)


module.exports = router;