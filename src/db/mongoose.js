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
        min: 7,
        trim: true,
        validate:{
            validator: (value)=>{
                return value.toLowerCase().includes("password");
            },
            message: 'Come on man, atleast try!'
        }
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

const Task = mongoose.model('task', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        defaul: false,
    }
})

const task = new Task({description: 'Get a burger from McDonalds'});
const him = new User({name: 'Baby', email: 'amit@bitsgoa.ac.', age: 20});

him.save()
.then(()=>{
    console.log(him);
})
.catch((err)=>{
   return console.log(err);
})