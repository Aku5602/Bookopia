// mongodb+srv://system:<password>@cluster.qk2mvko.mongodb.net/?retryWrites=true&w=majority
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://system:pccoe@cluster.qk2mvko.mongodb.net/CollegeLibraryManagement?retryWrites=true&w=majority").
    then(() => console.log("Connected To DB")).catch((err) => console.log("Some error", err));

// 