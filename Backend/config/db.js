const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        
        maxPoolSize: 5, 
        serverSelectionTimeoutMS: 5000, 
      });
      
    } catch (err) {
      console.error("❌ MongoDB connection error:", err);
      process.exit(1);
    }
  };
  

module.exports = connect