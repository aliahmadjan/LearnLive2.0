const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const Admin = require('../Models/admin.model')
//const Teacher= require('../Models/teacher.model')

require('dotenv').config();

module.exports = (req,res,next)=>
{
    const {authorization }= req.headers;
    //console.log(authorization);
     
    if(!authorization)
    {
        return res.status(401).send({
            error: "L"
        });
    }
    const token = authorization.replace("Bearer ","");
    //console.log(token);
    jwt.verify(token,process.env.SECRET_KEY_ADMIN, (err,payload)=>
    {
        if(err)
        {
           return res.status(401).json({error: "LPC" +token});
        }

        const { _id } = payload;

        Admin.findById(_id).then(admindata => {
            console.log(admindata);
            req.admin = admindata;
            next();
        })
    })
    //next();
}