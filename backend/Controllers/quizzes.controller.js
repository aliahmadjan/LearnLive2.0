const express = require('express');
const https = require('https');
const Quizzes = require('../Models/quizzes.model')
const Student = require('../Models/student.model')


const jwt = require('jsonwebtoken');
const { error } = require('console');
const router = express.Router()

const AddQuiz= (req,res,next)=>
{
        const { campname, teacher,teacher_name, quizno,nofquestions, questions} = req.body;
    
        const quizObj = {
            campname: campname,
            teacher: teacher,
            teacher_name: teacher_name,
            quizno: quizno,
            nofquestions: nofquestions,
            questions: questions,
        }
    
        Quizzes.create(quizObj, (err, quiz) => {
            if(err) res.status(500).send({message: err.message});
            else res.status(200).send( quiz );
        })
    

}

const AddQuizQuestions = (req,res,next) => {
    const {questions} = req.body;
    const quizId = req.params.id;
  
    Quizzes.findByIdAndUpdate({_id: quizId}, {questions: questions}).exec((err, result) => {
      if(err) res.status(500).send({message: err.message});
      else {
        res.status(200).send(result);
           }
      })
    }

const GetQuizzes = (req,res,next)=>
{
   Quizzes.find((error,data) => {
        if(error)
        {
            res.send("Could Not Get Quizzes")
        }
        else 
         {
            res.json(data)
         }
    })
}

// const GetQuizOnName = (req,res,next) =>
// {
//     Quizzes.find((error,data) =>
//     {

//     })
// }

const GetSingleQuiz = (req,res,next)=>
{
    var x = req.query.id; // for getting single id 
    //console.log(x);
     Quizzes.findById(x , (error,data) =>
    {
        if(error){
            res.send("Not Found!");
        }
        else {
            res.json(data)
        }
    })
}

const DeleteQuiz = (req,res,next) =>
{
    
    Quizzes.findByIdAndDelete(req.params.id,(error,data)=> {
        if(error){
            return next(error);
        }
        else {
            //res.send("Teacher Deleted Successfully!")
            res.status(200).json({
                msg:data
            })
        }
    })
}

// const GetQuizzes = (req, res) => {
// 	const teacherId = req.params.id;
// 	Quizzes.find({teachers: teacherId}).exec((err, quizzes) => {
// 		if(err) res.status(500).send({message: err.message});
// 		else res.status(200).send({data: quizzes});
// 	})
// }

// const GetAllQuizzes = (req,res,next) =>
// {
//     var x = (req.query.id) // quiz id
 
//     const quizzes =  Quizzes.findbyId(x)
//    // const quizzes =  Quizzes.findById(x)
//     console.log(quizzes);
   
//     for(i=0; i<quizzes.questions.length; i++)
//     {  
     
//        console.log(quizzes.questions[i])
//          res.json(quizzes.questions[i]); 


//     }
// }




exports. AddQuiz = AddQuiz;
exports. AddQuizQuestions = AddQuizQuestions;
exports.GetQuizzes = GetQuizzes;
exports.GetSingleQuiz= GetSingleQuiz;
exports.DeleteQuiz = DeleteQuiz;

//exports.GetAllQuizzes = GetAllQuizzes;
