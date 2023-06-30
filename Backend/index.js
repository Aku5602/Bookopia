const express = require('express');
const studentData = require("./routes/studentData");
const bookData = require("./routes/bookData");
const cors = require("cors");
const StudentDetails = require("./database/schemas/StudentDetails");
// import path from "path";

const app = express();

const port = 3001;

app.use(cors({
    origin: ["http://localhost:5173"]
}))

app.use(express.json());

require("./database/conn");
app.use(studentData);
app.use(bookData);


// require("./routes/server");

app.listen(port, (err) => {
    if (err) throw "Error";
    console.log("Listening to port ", port);
})