const express = require("express");
const { Router} = require('express');
const StudentDetails = require("../database/schemas/StudentDetails")

const router = Router();

//Read
router.get("/studentData", async (request, response) => {
    // const LoginUser = await Login.findOne();
    const studentData= await StudentDetails.find({});
    response.send(JSON.stringify(studentData));
})

//Create
router.post("/studentData", async (request, response) => {
    // const LoginUser = await Login.findOne();
    const obj = {...request.body}
    obj.quantity = +obj.quantity;
    obj.returned = +obj.returned;
    const studentData= await StudentDetails.create(obj);
    response.send(JSON.stringify(studentData));
})

//Update 

//Delete 




module.exports = router;