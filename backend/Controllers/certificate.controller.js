const express = require('express');
const https = require('https');
const Certificate = require('../Models/certificate.model');


const jwt = require('jsonwebtoken');
const router = express.Router()

const GenerateCertificate = async (req,res,next) => {
  const { student_id ,student_name, campname, startdate, enddate, issued_date } = req.body;
  try {
    // Check if a certificate already exists for the given student, camp and dates
    const existingCertificate = await Certificate.findOne({ student_id });
    if (existingCertificate) {
      return res.status(400).send({ error: 'A certificate already exists for this student, camp and dates.' });
    }

    const certificate = new Certificate({
      student_id: req.body.student_id,
      student_name: req.body.student_name,
      campname: req.body.campname,
      startdate: req.body.startdate,
      enddate: req.body.enddate,
      issued_date: req.body.issued_date
    });

    await certificate.save();
    console.log('Certificate added successfully!');
    // Return the newly generated certificate
    return res.status(200).send({ message: 'Certificate generated successfully', certificate });
  } catch (err) {
    console.error('Error while adding certificate:', err.message);
    return res.status(500).send({ error: 'Error while generating certificate.' });
  }
};

  
  
exports.GenerateCertificate = GenerateCertificate;