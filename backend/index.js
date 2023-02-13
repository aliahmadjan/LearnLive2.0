const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
//const fileUpload = require('express-fileupload')
require('dotenv').config();
const config = require('./config');
const qs = require('qs');
const bodyParser = require('body-parser')
const KJUR = require('jsrsasign')
const axios = require("axios")





const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json({limit: '50mb'}));
 mongoose.connect("mongodb+srv://aliahmadjan:12345@cluster0.j5u9lxj.mongodb.net/LearnLive?retryWrites=true&w=majority&ssl=true");
 const connection = mongoose.connection;
 connection.once('open', () => { 
   console.log("MongoDB connection established successfully");
 })


const TeacherRouter = require('./Routes/teacher.route');
const StudentRouter = require('./Routes/student.route');
const AdminRouter = require('./Routes/admin.route');
const TeacherAssignmentsRouter = require('./Routes/teacher-assignments.route');
const StudentAssignmentsRouter = require('./Routes/student-assignments.route');
const CampRouter = require('./Routes/camp.route');
const QuizzesRouter = require('./Routes/quizzes.route');
const zoomMainRouter = require('./Routes/zoomMain.route');
const zoomMeetRouter= require('./Routes/zoomMeet.route');
const QuizzesScoreRouter = require('./Routes/quiz-score.route')


const TokenTeacher = require('./Middleware/TeacherToken');
const TokenStudent = require('./Middleware/StudentToken');
const TokenAdmin = require('./Middleware/AdminToken')

const TeacherAssignments = require('./Models/teacher-assignments.model')
//const NewAssignmentRouter = require('./routes/uploadassignment-route')
app.use('/teacher' ,express.static('teacher'));
app.use('/teacher',TeacherRouter);
app.use('/teacher-assignments',express.static('teacher-assignments'));
app.use('/tchassignments',TeacherAssignmentsRouter)
app.use('/student-assignments',express.static('student-assignments'));
app.use('/stdassignments',StudentAssignmentsRouter);
app.use('/student' ,express.static('student'));
app.use('/student',StudentRouter);
app.use('/admin' ,express.static('admin'));
app.use('/admin',AdminRouter);
app.use('/camp',CampRouter);
app.use('/quizzes',QuizzesRouter);
app.use('/zoomMain',zoomMainRouter);
app.use('/zoomMeet',zoomMeetRouter);
app.use('/quizscore',QuizzesScoreRouter);



app.get('/teacher/viewprofile',TokenTeacher,(req,res)=>
{
 // console.log(req.teacher);
  res.send(req.teacher);
 // res.send("TOKEN VERIFIED");
});

app.get('/student/viewprofile', TokenStudent, (req,res) =>
{
  //console.log(req.student);
  res.send(req.student);
});

app.get('/admin/viewprofile', TokenAdmin, (req,res) =>
{
  //console.log(req.admin);
  res.send(req.admin);
});


app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });

