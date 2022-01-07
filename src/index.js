require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

mongoose.connect(
    process.env.MONGO_URI , {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    } , () => {
        console.log('db connected');
    }
);

app.get('/ping' , (req , res , next) => {
    try{
        res.json({
            message : "pong"
        });
    }
    catch(err){
        res.json({
            message : err
        })
    }
});

// Authentication routes

const AuthRoutes = require('./Routes/AuthRoutes');

// adding /users to each route url
app.use('/' , AuthRoutes);



const PORT = process.env.PORT || 3000;

app.listen(PORT , () => {
    console.log(`App started at port ${PORT}`);
});