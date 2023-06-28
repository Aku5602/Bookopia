const express = require("express");
const { Router} = require('express');
//book schema
const BookDetails = require("../database/schemas/BookDetails")

const router = Router();

//Read
router.get("/bookData", async (request, response) => {
    // const LoginUser = await Login.findOne();
    const bookData= await BookDetails.find({});
    response.send(JSON.stringify(bookData));
})

//Create or PUT
router.post("/bookData", async (request, response) => {
    // const LoginUser = await Login.findOne();
    const obj = {...request.body}
    obj.quantity = +obj.quantity;
    obj.copies_issued = +obj.copies_issued;
    obj.no = +obj.no;
    const bookData= await BookDetails.create(obj);
    response.sendStatus(200);
})

//Update 
router.patch("/bookData", async (request, response) => {
    // const LoginUser = await Login.findOne();
    const value = request.body.value;
    const key = request.body.key;
    // obj.quantity = +obj.quantity;
    // obj.returned = +obj.returned;
    const bookData= await BookDetails.updateOne( filter,{key:value});
    response.sendStatus(200);
})

//Delete 
router.delete("/bookData", async (request, response) => {
    // const LoginUser = await Login.findOne();
    const bookData= await BookDetails.deleteOne( filter,{key:value});
    response.sendStatus(200);
})

module.exports = router;