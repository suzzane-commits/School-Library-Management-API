const mongoose = require('mongoose');
const env = require('dotenv').config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err);
        process.exit(1); // stop app if DB fails
    }
};
module.exports = connectDB; 

