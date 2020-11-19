const mongoose = require("mongoose");


const opportunitySchema = new mongoose.Schema({
    title :  {
        type : String ,
        required : true , 
    },
    description :  {
        type : String ,
        required : true , 
    },
    startAt : {
        type : Date  , 
        required : true , 

    },
    endAt : {
        type : Date  , 
        required : true , 

    },
    type : {
        type : String , 
        require : true 
    },
    sallary : {
        type : Number , 
        required : true 
    },
    skills : [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "skill",
        required: true,
    } 
    ],
    company : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }

})
module.exports = mongoose.model("opportunity", opportunitySchema);
