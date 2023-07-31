require('dotenv').config(); 
const express = require('express');
const studentData = require("./routes/StudentData");
const bookData = require("./routes/bookData");
const cors = require("cors");
const cron = require("node-cron");
const StudentDetails = require("./database/schemas/StudentDetails");
const app = express();

const port = +process.env.PORT;

app.use(cors({}));

app.use(express.json());

require("./database/conn");
app.use(studentData);
app.use(bookData);

cron.schedule('* * * * *', () => { 
    console.log('running a task every minute',new Date().getMinutes());
});
// require("./routes/server");

app.listen(port, (err) => {
    if (err) throw "Error";
    console.log("Listening to port ", port);
})