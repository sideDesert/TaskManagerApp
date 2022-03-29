const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');

const User = mongoose.model('user', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate:{
            validator: function(value){
                return validator.isEmail(value);
            },
            message: 'Invalid Email'
        }
    },
    password:{
        type: String,
        required: true,
        min: [8, 'too short!'],
    },
    age: {
        type: Number,
        default: 0,
        validate: {
            validator: function(age){
                if(age<0){
                    throw new Error('Bruh age can`t be negative');
                }
            }
        }
    }
});



module.exports = User;