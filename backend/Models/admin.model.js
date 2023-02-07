const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
require("dotenv").config();

const adminSchema = new moongose.Schema({

    name: {
        type: String
    },

    email :{
        type: String
    },

    gender: {
        type: String
    },

    phoneno: {
        type: String
    },
    password:{
        type: String
    },

    cpassword :{
        type: String
    },

    profileimg: {
        type: String
    },

       tokens : [
{
    token: {
        type: String
    }
}

    ],

})

    adminSchema.methods.generateAuthToken = async function()
    {
        try {
                let tokenLogin = jwt.sign({_id:this._id}, process.env.SECRET_KEY_ADMIN);
                this.tokens = this.tokens.concat({token:tokenLogin});
                await this.save();
                return tokenLogin;
        }
        catch(err) {
                console.log(err);
        }
    }

const Admin = mongoose.model('Admin',adminSchema);
module.exports = Admin;