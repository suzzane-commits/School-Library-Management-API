require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authorRoute = require('./routes/authorRoutes');
const studentRoute = require('./routes/studentRoutes');
const attendantRoute = require('./routes/attendantRoutes');
const bookRoute = require ('./routes/bookRoutes')
const PORT = (process.env.PORT);
const server=express();
server.use(express.json());
connectDB();
server.use('/', authorRoute);
server.use('/', studentRoute);
server.use('/', attendantRoute);
server.use('/', bookRoute);
server.get('/', (req,res) =>{
    res.send("API is working properly")
    });
server.listen(PORT,() =>
{
    console.log("PORT runs perfectly")
});