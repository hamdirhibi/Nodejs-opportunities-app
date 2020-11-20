const router = require('express').Router() ; 
const User = require('../models/user');
const Session = require('../models/session');
const notification = require('../models/notification');


exports.addSession = async (req,res) =>{
    try {
        
        const user = await User.find({
            _id : req.params.user  
        })
        const session = await Session.create({
            title : req.body.title , 
            date : req.body.date , 
            description : req.body.description , 
            duration : req.body.duration , 
            user : req.body.user , 
            cover : req.body.cover

        })
        user.sessions.push(session);
        user.save().then( s =>{
            res.status(200).json(s);
        })

        res.json(session)
    }
    catch(err){
        res.json({message: err})
    }
}


exports.getSessions= async (req,res) =>{
    try {
        
        const sessions = await Session.find({}) ;
        res.json(sessions)
    }
    catch(err){
        res.json({message: err})
    }
}


exports.deleteSesion = async (req,res) =>{
    try {
        const session = await Session.findById(req.params.sessionId); 
        
        if (!session) {
            return res
            .status(409)
            .json({ message: "session  doesn't  exist ! " });
        }

        await User.updateMany(
            {},
            { $pull : { skills : {$in : req.params.sessionId } } },
            { multi: true }

        )
        await Session.deleteOne({
            _id : req.params.sessionId
        })

        res.status(200).json({message : 'Successfully deleting Session '}); 
    }
    catch(err){
        res.json({message: err})
    }



    
}


exports.updateSessionDate= async (req,res) =>{
    try {
        
        Session.updateOne(
            {_id : req.params.sessionId} ,
             {
                 $set : {
                     date : req.body.date
                 }
             }
        )
    }
    catch(err){
        res.json({message: err})
    }
}

exports.updateSessionCover = async (req,res) =>{
    try {
        
        Session.updateOne(
            {_id : req.params.sessionId} ,
             {
                 $set : {
                     cover : req.body.cover
                 }
             }

        )
    }
    catch(err){
        res.json({message: err})
    }
}


exports.updateSessionduration = async (req,res) =>{
    try {
        
        Session.updateOne(
            {_id : req.params.sessionId} ,
             {
                 $set : {
                     duration : req.body.duration
                 }
             }

        )
    }
    catch(err){
        res.json({message: err})
    }
}
