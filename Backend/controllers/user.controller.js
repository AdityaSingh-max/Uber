const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const  {validationResult} = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');


module.exports.reqisterUser = async(req,res,next)=>{

    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({error: error.array()});
    }

    const {fullname, email, password} = req.body;

    const isUserAlreadyExists = await userModel.findOne({email});

    if(isUserAlreadyExists){
        return res.status(400).json({message: 'User already exists'});
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(200).json({token,user});


}

module.exports.loginUser = async(req,res,next)=>{

    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({error: error.array()});
    }

    const {email,password} = req.body;

    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({token, user});

}    

module.exports.getUserProfile = async(req,res,next)=>{
    res.status(200).json(req.user);
}

module.exports.logoutUser = async(req,res,next)=>{
    try{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({
        message: 'Unauthorized'
     });
    }

    await blacklistTokenModel.create({token});

    res.clearCookie('token');
    res.status(200).json({message: 'Logged out'});

    }
     catch(error){
       console.error(error);
        return res.status(500).json({
        message: 'Logout failed'
    });
    }
}