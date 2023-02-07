const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
require("dotenv").config();

const quizscoreSchema = new mongoose.Schema({
    
   quiz_id : {
    type: String
   },
    student_id :{
    type : String
   },
   campname: {
      type: String
   },
   quiz_score : {
    type: Number
   },

   total_questions :{
      type: Number
   }

})

const QuizzesScore = mongoose.model("QuizzesScore", quizscoreSchema);
module.exports = QuizzesScore;