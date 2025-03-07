const mongoose = require('mongoose');

const connectDB=async (dbName)=>{
    try{
        const uri=process.env.MONGO_URI;
        if (!uri) {
            console.log('MONGO_URI is not defined in the environment variables.');
            process.exit(1);
        }
        await mongoose.connect(uri,{
            dbName:dbName
        });
        console.log(`mongodb connected`);
    }
    catch(error){
        console.log(`error connecting to mongodb ${error.message}`);
        process.exit(1);
    }
}
module.exports=connectDB;