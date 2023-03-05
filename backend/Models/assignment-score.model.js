const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
require("dotenv").config();

const assignmentscoreSchema = new mongoose.Schema({
    
   tchassignment_id : {
    type: String
   },

   stdassignment_id : {
      type: String
   },


   student_name: {
      type: String
   },
   student_id: 
      {
          type: String
      },

   campname: {
      type: String
   },
   assignment_score : {
    type: Number
   },

   tmarks :{
      type: Number
   }

})

const AssignmentsScore = mongoose.model("AssignmentsScore", assignmentscoreSchema);
module.exports = AssignmentsScore;