const express = require('express'); 
const app = express (); 
const mongoose = require('mongoose'); 
const dotenv = require('dotenv') ; 
const bodyParser = require('body-parser');
//import routes 
const productRoute = require('./routes/Product'); 
const UserRoute = require('./routes/User'); 
const OrderRoute = require('./routes/Order'); 
const CategoryRoute = require('./routes/Category'); 
//const  User = require('./models/User'); 
const path = require ('path') ; 

dotenv.config() ; 



// configuration of the rest API
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });
  



//Connect to DB 
mongoose.connect(process.env.MONGODB_URI, 
{useNewUrlParser:true}   ,
()=>{console.log('connected to db ');  
})


//User.collection.updateMany({}, {$set : {role : 'ROLE_CLIENT'}},false , true);

 //Middlewares 
 app.use(express.json())
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));
// route middlewares 
app.use('/product',productRoute); 
app.use('/user', UserRoute) ; 
app.use('/order', OrderRoute) ; 
app.use('/category', CategoryRoute) ; 
app.use("/uploads", express.static("./uploads"));
//console.log(__dirname)

// if (process.env.NODE_ENV=='production'){
//   app.use(express.static('./client/www')); 
//   app.get('*', (req, res)=>{
//       res.sendFile(path.join(process.env.PWD,'client','www','index.html')); 
//   })

// }

app.listen (process.env.PORT ||3000, ()=>{
console.log('server up and running ');
}) 