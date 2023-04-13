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
const http = require('http')
const {Server} = require('socket.io');
const ACTIONS = require('../backend/actions')
const path = require('path');


const app = express();
const port = process.env.PORT || 5000;
const port1 = 6000;

//const port= process.env.BASE_URL
//const port = "https://main--reliable-biscuit-f62ccb.netlify.app";



const server = http.createServer(app)
const io = new Server(server)

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
const AssignmentScoreRouter = require('./Routes/assignment-score.route')
const CertificateRouter= require('./Routes/certificate.route')
const LeaderboardRouter = require('./Routes/leaderboard.route')


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
app.use('/assignmentscore',AssignmentScoreRouter);
app.use('/certificate',CertificateRouter)
app.use('/leaderboard',LeaderboardRouter)

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

// app.use(express.static('build'));
// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

const userSocketMap = {};
function getAllConnectedClients(roomId) {
    // Map
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                username: userSocketMap[socketId],
            };
        }
    );
}

io.on('connection', (socket) => {
    //console.log('socket connected', socket.id);

    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id,
            });
        });
    });

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
        io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });
});

server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
