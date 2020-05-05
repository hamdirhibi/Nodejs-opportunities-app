const Order  = require ('../models/Order')
const User =  require('../models/User')
const Product =  require('../models/Product')
const {OrderValidation} = require('../validation')

exports.Order_get_One= async (req,res)=>{
    try{
        const order = await Order.findById({
            _id : req.params.orderId
            }); 
            
        res.json(order); 
       
    }catch (err){
        res.json({message : err}); 
    }



}


//getAll Categories
exports.Order_findAll = async (req,res)=>{
    try{
        const order = await Order.find(); 
        res.json(order);
    }catch (err){
        res.json({message : err}); 
    }

}

//getAll Order By id 
exports.Order_by_ID = async (req,res)=>{
    try{
       // console.log('request for Order !! ') 
        const order = await Order.find({
            author : req.params.orderId
            }); 
            
        res.json(order); 
       
    }catch (err){
        res.json({message : err}); 
    }



}





//Create New product 
exports.Order_save = async (req,res)=>{

        const {error} = OrderValidation(res.body) ; 
        if (error) return res.status(400).send(error.details[0].message) ; 
        try{
            const user = await User.findById(req.body.author); 
            if (!user) 
            res.status(409).json({message : 'user not exist'});
            const date = new Date() ; 
            const state = "onProgress" ; 
            const order = new Order({
            author  : user ,
            products : req.body.products , 
            quantities : req.body.quantities , 
            createdAt : date ,
            state : state ,
            total : req.body.total,
            deleveryDate : req.body.deleveryDate,
            paymentMethod : req.body.paymentMethod,
            phone : req.body.phone,
            freeSpace : req.body.freeSpace ,
            weight : req.body.weight,
            orderAddress : req.body.orderAddress 
            }); 
            const savedOrder = await Order.create(order).
            then(()=>{
                console.log('Order created ');    
            });
            res.status(200).json("order saved"); 
            }catch(err){
                res.json({message : err});
            }

        }

    

//getAll Categories
exports.Order_OnPregress = async (req,res)=>{
    try{
            const order = await Order.find({
                state : "onProgress"
            }); 
     
            res.json(order) ; 

    }catch (err){
        res.json({message : err}); 
    }

}


