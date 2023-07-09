// mongodb+srv://system:<password>@cluster.qk2mvko.mongodb.net/?retryWrites=true&w=majority
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL).
    then(() => console.log("Connected To DB")).catch((err) => console.log("Some error", err));
 
// 