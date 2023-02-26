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
        type: Date,
        timestamps: false
    },
   

    uplassign: {
        type: Array
    },

    student:{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },

    quizid: {
        type: Schema.Types.ObjectId,
        ref: 'Quizzes'
    }
  
});

const StudentAssignments = mongoose.model('StudentAssignments', studentAssignmentsSchema );
module.exports= StudentAssignments;