const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectDB = ()=>{

    try{
        const conn = mongoose.connect(process.env.MONGODB_CONNECT_URI);
        console.log('Connected');
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
} 

module.exports = connectDB;