const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Quizzes = require('../Models/quizzes.model')
const TokenTeacher = require('../Middleware/TeacherToken')
const QuizzesController = require('../Controllers/quizzes.controller')
const TokenStudent = require('../Middleware/StudentToken');
const Student = require('../Models/student.model')
router.post('/addquiz',QuizzesController.AddQuiz);

router.post('/addquizques/:id',QuizzesController.AddQuizQuestions);

router.get('/getquizzes', QuizzesController.GetQuizzes);

router.get('/getcurrquizzes',TokenTeacher, async(req,res)=>
{
  //console.log(req.teacher._id.toHexString())
  const quiz =  await Quizzes.find()
  //console.log(tchass[0])
  const arr = []
   for(let i=0; i<quiz.length; i++)
   {
  
    //for(let j=0; j<tchass[i].teacher.length; j++)
    //{
      //const id = ObjectId();
      //console.log(tchass[i].teacher)
      
       if (req.teacher._id.toHexString() === quiz[i].teacher)
       {
        //console.log("Hello World")
        arr.push(quiz[i] )
       // console.log(tchass[i].campname)
      }
   // }
  }
  //res.send(tchass)
  res.send(arr)
})

router.get('/samestdquiz',TokenStudent, async(req,res)=>
{
  //console.log(req.teacher._id.toHexString())
  const tchquiz =  await Quizzes.find()
    const arr= [];

    for(let i=0; i<tchquiz.length; i++)
   {
       if (req.student.campname.includes(tchquiz[i].campname))
       {
        arr.push(tchquiz[i] )
      }
  }
  res.send(arr)
})




router.get('/getquiz/:id',QuizzesController.GetSingleQuiz);

router.delete('/deletequiz/:id',QuizzesController.DeleteQuiz);

module.exports = router;