const mongoose = require('mongoose');

const connectDB = async (dbName)=>{
    try{
        const uri = process.env.MONGO_URI;
        await mongoose.connect(uri,{
            dbName:dbName,
        })
        console.log(`connected to database`);
    } catch(error){
        console.log(`error connecting to mongodb ${error.message}`);
        process.exit(1);
    }
}
module.exports = connectDB;