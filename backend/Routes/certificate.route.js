const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Certificate = require('../Models/certificate.model')
const CertificateController = require('../Controllers/certificate.controller')
const TokenStudent = require('../Middleware/StudentToken');
router.post('/generatecert',CertificateController.GenerateCertificate);

router.get('/getcert', TokenStudent , async(req,res,next) =>
{
    const cert =  await Certificate.find()
    const arr= [];
    for(let i=0; i<cert.length; i++)
   {
       if (req.student.name.includes(cert[i].student_name))
       {
        arr.push(cert[i])
      }
  }
  res.send(arr)
})

module.exports = router;