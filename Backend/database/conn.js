
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL).
    then(() => console.log("Connected To DB")).catch((err) => console.log("Some error", err));
 
// 