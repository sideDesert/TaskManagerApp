const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
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

userSchema.statics.findByCredentials = async (email, password)=>{
    const user = await User.findOne({email}, 'password email');
    if(!user){
        throw new Error('Unable to login!');
    }
    console.log(user);
    const hashedPassword = user.password;
    const isMatch = await bcrypt.compare(password, hashedPassword);
    // console.log(isMatch);
    if(!isMatch){
        throw new Error('Unable to login!');
    }
    return user;
}

userSchema.pre('save', async function(next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model('user', userSchema);



module.exports = User;