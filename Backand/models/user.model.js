const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        require : true,
        minlength : [3 , 'First name must be at least 3 character'],
    },
    lastname: {
        type: String,
        require : true,
        minlength : [3 , 'First name must be at least 3 character'],
    },
    email: {
        type: String,
        require : true,
        unique : true,
        minlength : [5 , 'First name must be at least 3 character'],
    },
    fullname: {
        type: String,
        require : true,
    },
    socketId: {
        type: String,
    },
    password: {
        type: String,
        require : true,
        Select : false,
    },
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn : '24'});
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password);
}
userSchema.static.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;