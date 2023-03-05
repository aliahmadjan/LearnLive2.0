const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');
Schema=mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types
require("dotenv").config();

const studentAssignmentsSchema = new moongose.Schema({
    campname :{
        type: String
    },
    
    title: {
        type: String
    },

    description: {
        type: String
    },

  
    tmarks : {
        type: Number
    },

    duedate: {
        type: String,
    
    },
   

    uplassign: {
        type: Array
    },
    student_name: {
        type: String
     },

    student:{
        type: String
    },

   assignment_id:{
    type: String
   }
  
});

const StudentAssignments = mongoose.model('StudentAssignments', studentAssignmentsSchema );
module.exports= StudentAssignments;