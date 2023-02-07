const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
require("dotenv").config();

const quizSchema = new mongoose.Schema({
    
    campname: {
        type: String
    },

    teacher: {
        type: String
    },
    quizno: {
        type: String
    },
    nofquestions: 
    {
        type: Number
    },
    questions: {
        type: Array
    }

})

const Quizzes = mongoose.model("Quizzes", quizSchema);
module.exports = Quizzes;