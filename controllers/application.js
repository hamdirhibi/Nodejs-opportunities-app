const Notification = require ('../models/notification');
const Opportunity = require('../models/opportunity');
const User = require('../models/user') ; 
const Application = require('../models/application') ; 



exports.newApplication = async (req,res) =>{

    try{
        const user = await User.findById(req.params.userId); 
        
        if (!user) {
            return res
            .status(409)
            .json({ message: "user  doesn't  exist ! " });
        }
        const opportunity = await Opportunity.findById(req.params.opportunityId); 
        
        if (!opportunity) {
            return res
            .status(409)
            .json({ message: "opportunity  doesn't  exist ! " });
        }

        const createdAt = new Date();



        const newApplication = new Application({
            cv : req.files[0].path ,
            motivation : req.body.motivation ,
            user : req.body.userId ,
            opportunity : req.body.opportunityId ,
            createdAt : req.body.createdAt ,
            status : 'pending' 
        });

        const savedApplication= await newApplication.save() ; 
        res.status(200).json(savedApplication);

    }catch (err){
        res.json({message : err}); 
        console.log(err) ;
    }


}


exports.getApplicationByUser = async (req,res) =>{
    try {

        const applications = await Application.find({
            user : req.userData.user._id,
        })
        res.json(applications)
    }
    catch(err){
        res.json({message: err})
    }
}


exports.getApplicationByOpportunity = async (req,res) =>{
    try {

        const opportunity = await Opportunity.findById(req.params.opportunityId); 
        
        if (!opportunity) {
            return res
            .status(409)
            .json({ message: "opportunity  doesn't  exist ! " });
        }


        const applications = await Application.find({
            user : req.params.opportunityId,
        })
        res.json(applications)
    }
    catch(err){
        res.json({message: err})
    }
}




exports.deleteApplication = async (req,res) =>{
    try {
        const application = await Application.findById(req.params.applicationId); 
        
        if (!application) {
            return res
            .status(409)
            .json({ message: "application  doesn't  exist ! " });
        }

        
        await Application.deleteOne({
            _id : req.params.applicationId
        }) ; 

        res.status(200).json({message : 'Successfully deleting Application '}); 
    }
    catch(err){
        res.json({message: err})
    }
}


exports.updateApplication = async (req,res) =>{
    try {
        const application = await Application.findById(req.params.applicationId); 
        
        if (!application) {
            return res
            .status(409)
            .json({ message: "application  doesn't  exist ! " });
        }
        const applicationUpdated =  await Application.updateOne({
            
                _id : req.body.opportunityId,
                status : req.body.status
        })
        res.status(200).json(applicationUpdated); 
    }
    catch(err){
        res.json({message: err})
    }
}
