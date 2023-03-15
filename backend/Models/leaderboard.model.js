const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
require("dotenv").config();


const leaderboardSchema = new moongose.Schema(
    {
            campname : {
                type: String
            },

            tchassignment_id : {
                type: Array
            },

            tchquiz_id : {
                type: Array
            },

            student_id : {
                type: String
            },

            student_name : {
                type: String
            },

            assignment_score :{
                type: Array
            },

            quiz_score: {
                type: Array
            },

            total_assignmentscore: {
                type: Array
            },

            total_quizscore: {
                type: Array
            },
    }
)

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);
module.exports = Leaderboard;