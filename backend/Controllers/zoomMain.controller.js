const express = require('express');
const https = require('https');
const cors = require('cors');
const mongoose = require('mongoose');
//const fileUpload = require('express-fileupload')
require('dotenv').config();
const qs = require('qs');
const bodyParser = require('body-parser')
const KJUR = require('jsrsasign')
const axios = require("axios")

const zoomMainSchema = require('../Models/zoomMain.model')

const AddZoom = (req,res,next) => 
{
    const zoom = new zoomMainSchema({
        user_id : req.body.user_id,
        email: req.body.email,
        access_token: req.body.access_token,
        refresh_token: req.body.refresh_token,
        expires_in: req.body.expires_in
    })
    try {
        zoom.save()
        res.send(zoom)
    }
    catch (e) {
        console.log(e)
        return res.status(500).send({error: err.message})
    }
}

const GetZoomData = (req,res,next) => 
{
    zoomMainSchema.find((error,data) => {
        if (error) {
            res.send('Could not find main zoom data')
        }
        else {
            res.json(data)
        }
    })
}

const updateZoomToken = (req,res,next) => 
{
    zoomMainSchema.findByIdAndUpdate(req.params.id, {
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

const refreshZoom = async (req,res,next) => {
    try {
      const zoomMainRes = await fetch("http://localhost:5000/zoomMain/getData", {
        method: "GET",
      });
      const zoomUserData = await zoomMainRes.json();
      var config = {
          method: 'post',
          url: `https://zoom.us/oauth/token?grant_type=refresh_token&refresh_token=${zoomUserData[0].refresh_token}`,
          headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": "Basic " + Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')
          }
      };
  
      var zoomRes = await axios(config)
          .then(function (response) {
              return response;
          })
          .catch(function (error) {
              return error;
          });
          
      var data1 = JSON.stringify({
        access_token: zoomRes.data.access_token,
        refresh_token: zoomRes.data.refresh_token,
        expires_in: zoomRes.data.expires_in
      });
  
      var config2 = {
        method: 'put',
        url: 'http://localhost:5000/zoomMain/updatezoommain/63ea53b1e8231a85d9783e6e',
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        },
        data: data1
        };
  
    var zoomRes2 = await axios(config2)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error;
        });
    return res.status(200).send("New tokens generated and updated");
    }
    catch (e) {
      console.log(e)
      return res.status(500).send("Something went wrong");
    }
}

const ConnectZoom = async(req,res) => {
    try {
      var data = qs.stringify({
        code: req.body.code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.ZOOM_REDIRECT_URL
      });
  
      var config = {
          method: 'post',
          url: 'https://zoom.us/oauth/token',
          headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": "Basic " + Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')
          },
          data: data
      };
  
      var zoomRes = await axios(config)
          .then(function (response) {
              return response;
          })
          .catch(function (error) {
              return error;
          });
      const zoomUserRes = await fetch("https://api.zoom.us/v2/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${zoomRes.data.access_token}`,
        },
      });
      const zoomUserData = await zoomUserRes.json();
      const temp = await fetch("http:/localhost:5000/zoomMain/addData", {
        // Adding method type
        method: "POST",
        // Adding body or contents to send
        body: JSON.stringify({
          email: zoomUserData.email,
          user_id: zoomUserData.user_id,
          access_token: zoomRes.data.access_token,
          refresh_token: zoomRes.data.refresh_token,
          expires_in: zoomRes.data.expires_in
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
      })
      return res.send('Authorization Successfully Done')
    } catch (e) {
      console.log(e)
      return res.status(500).send("Something went wrong");
    }
  }

const meetingsInfo = async (req,res) => {
    //Get access token through email from database
    try {
      var data = qs.stringify({
        email: req.body.email
      });
  
      var config = {
          method: 'post',
          url: 'http://localhost:5000/zoomMain/getToken',
          headers: {
              "Content-Type": "application/x-www-form-urlencoded"
          },
          data: data
      };
  
      var zoomRes = await axios(config)
          .then(function (response) {
              return response;
          })
          .catch(function (error) {
              return error;
          });
  
      var data1 = JSON.stringify({
        agenda: req.body.agenda,
        duration: req.body.duration
      });
  
      var config1 = {
          method: 'get',
          url: `https://api.zoom.us/v2/users/${req.body.email}/meetings`,
          headers: {
            Authorization: `Bearer ${zoomRes.data.access_token}`,
            "Content-Type": "application/json; charset=UTF-8",
          },
          data: data1
      };
  
      var zoomRes1 = await axios(config1)
          .then(function (response) {
              return response;
          })
          .catch(function (error) {
              return error;
          });
      
      res.send('Retrieved scheduled meetings by user')
    }
    catch (e) {
      console.log(e)
      return res.status(500).send("Something went wrong");
    }
  }

const DeleteZoomData = (req,res,next) => 
{
    try {
        zoomMainSchema.deleteMany({})
        res.send('Data deleted')
    }
    catch (e){
        console.log(e)
        return res.status(500).send({error: err.message})
    }
}

const findAccessToken = (req,res,next) => 
{
    const email = req.body.email
    try {
        zoomMainSchema.findOne({email:"i190573@nu.edu.pk"})
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).send(err)
        })
    }
    catch (e) {
        res.status(500).send(e)
    }
}

const createMeeting = async (req,res,next) => {
    //Get access token through email from database
    try {
      var user_email = 'i190573@nu.edu.pk'
      var data = qs.stringify({
        email: user_email
      });
      var config = {
          method: 'post',
          url: 'http://localhost:5000/zoomMain/getToken',
          headers: {
              "Content-Type": "application/x-www-form-urlencoded"
          },
          data: data
      };
  
      var zoomRes = await axios(config)
          .then(function (response) {
              return response;
          })
          .catch(function (error) {
              return error;
          });
          
      var data1 = JSON.stringify({
        agenda: req.body.agenda,
        duration: req.body.duration
      });
  
      var config1 = {
          method: 'post',
          url: `https://api.zoom.us/v2/users/${user_email}/meetings`,
          headers: {
            Authorization: `Bearer ${zoomRes.data.access_token}`,
            "Content-Type": "application/json; charset=UTF-8",
          },
          data: data1
      };
  
      var zoomRes1 = await axios(config1)
          .then(function (response) {
              return response;
          })
          .catch(function (error) {
              return error;
          });
      
      var data2 = JSON.stringify({
        zoom_id: zoomRes1.data._id,
        host_email: zoomRes1.data.host_email,
        topic: zoomRes1.data.topic,
        start_time: zoomRes1.data.start_time,
        duration: zoomRes1.data.duration,
        agenda: zoomRes1.data.agenda,
        start_url: zoomRes1.data.start_url,
        join_url: zoomRes1.data.join_url,
        password: zoomRes1.data.password,
        campname: req.body.campname,
        teacher: req.body.teacher
      });
  
      var config2 = {
          method: 'post',
          url: 'http://localhost:5000/zoomMeet/addData',
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          },
          data: data2
      };
  
      var zoomRes2 = await axios(config2)
          .then(function (response) {
              return response;
          })
          .catch(function (error) {
              return error;
          });
      res.send('Meet created and data saved to DB')
    }
    catch (e) {
      console.log(e)
      return res.status(500).send("Something went wrong");
    }
  }

exports.AddZoom = AddZoom
exports.GetZoomData = GetZoomData
exports.DeleteZoomData = DeleteZoomData
exports.findAccessToken = findAccessToken
exports.updateZoomToken = updateZoomToken
exports.refreshZoom = refreshZoom
exports.ConnectZoom = ConnectZoom
exports.meetingsInfo = meetingsInfo
exports.createMeeting = createMeeting