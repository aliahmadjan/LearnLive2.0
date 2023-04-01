const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
require("dotenv").config();

const certificateSchema  = new mongoose.Schema({

    student_id :{
        type: String
    },

    student_name : {
        type: String
    },

    campname : {
        type: Array
    },

    startdate: {
        type: Array
        // required: true
    },

    enddate : {
        type: Array
        // required:true
    },

    issued_date : {
        type: String
    },

})

const Certificate = mongoose.model("Certificate",certificateSchema)
module.exports = Certificate;