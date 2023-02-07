const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');
Schema=mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types
require("dotenv").config();

const teacherAssignmentsSchema = new moongose.Schema({
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

    uploadeddate:{
        type: String
    },

    duedate: {
        type: String
    },
   

    uplassign: {
        type: Array
    },

    // teacher: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Teacher'
    //     },
    // ],

    teacher:{
      type: String
    },
  
},{ timestamps: false });

const TeacherAssignments = mongoose.model('TeacherAssignments', teacherAssignmentsSchema );
module.exports= TeacherAssignments;