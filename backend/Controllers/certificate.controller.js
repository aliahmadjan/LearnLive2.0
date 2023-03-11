const express = require('express');
const https = require('https');
const Certificate = require('../Models/certificate.model');


const jwt = require('jsonwebtoken');
const router = express.Router()

  const GenerateCertificate = async (req,res,next) => {
    const { student_name, campname, startdate, enddate, issued_date } = req.body;
    try {
      const certificate = new Certificate({
        student_name: req.body.student_name,
        campname: req.body.campname,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        issued_date: req.body.issued_date
      });
    
      await certificate.save();
      console.log('Certificate added successfully!');
      return certificate;
    } catch (err) {
      console.error('Error while adding certificate:', err.message);
      throw err;
    }
  }
  
  
exports.GenerateCertificate = GenerateCertificate;