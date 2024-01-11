const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Hospital_Name:{
        type:String,
        required:true
    },
    Email_ID:{
        type:String,
        required:true,
        unique:true,
        // validate:function(){
        //     return emailValidator.validate(this.Email_ID);
        // }
    },
    Address:{
        type:String,
        required:true
    },
    Phone_Number:{
        type:Number,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    Hospital_registration_number:{
        type:Number,
        required:true
    },
    State:{
        type:String,
        required:true
    },
    Emergency_Ward_number:{
        type:Number,
        required:true
    },
    Pincode:{
        type:Number,
        required:true
    },
    Hospital_Registration_Date:{
        type:String,
        required:true
    },
    Number_of_Ambulance_available:{
        type:Number,
        required:true
    },
    Create_password:{
        type:String,
        required:true,
        // minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        // minLength:8,
        validate:function(){
            return this.confirmPassword==this.Create_password;
        }
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch(err) {
        console.log(err);
    }
}

const User = mongoose.model('USER', userSchema);

module.exports = User;