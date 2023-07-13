const express = require("express");
const { Router} = require('express');
//book schema
const BookDetails = require("../database/schemas/BookDetails")
const cloudinary = require("../cloudinaryInfo/cloudinary");
const uploader = require("../cloudinaryInfo/multer");

const router = Router();

//Read
router.get("/bookData", async (request, response) => {
    // const LoginUser = await Login.findOne();
    const bookData = await BookDetails.find({}).sort({'no': 1});
    response.send(JSON.stringify(bookData));
})

router.get("/bookData/Available/:id", async (request, response) => {
    // const LoginUser = await Login.findOne();
    const id = request.params.id;
    // console.log(id);
    const bookData = await BookDetails.find({'quantity':{$gt:0},'students_info.id':{$ne:id}}).sort({'no': 1});
    response.send(JSON.stringify(bookData));
})

//Create 
router.post("/bookData", uploader.single("file"), async (request, response) => {
    // const LoginUser = await Login.findOne();
    const obj = { ...request.body }
    const prevBook = await BookDetails.find({}).sort({ 'no': -1 }).limit(1);
    obj.no = prevBook[0].no + 1;
    obj.quantity = +obj.quantity;

    const upload = await cloudinary.v2.uploader.upload(request.file.path,{ folder: 'Books' });
    obj.image = upload.secure_url;
    const bookData = await BookDetails.create(obj);
    response.sendStatus(200);
})

//Update
router.put("/bookData", async (request, response) => {
    // const LoginUser = await Login.findOne();
    const obj = { ...request.body }
    obj.no = +obj.no;
    obj.quantity = +obj.quantity;

    const bookData = await BookDetails.updateOne({'no':obj.no},obj);
    response.sendStatus(200);
})

router.patch("/bookData", async (request, response) => {
 
    const obj = { ...request.body }
    
    const bookDataEditResponse = await BookDetails.updateOne({ '_id':obj._id }, { $set: {[request.body.key]:request.body.value} });
    response.sendStatus(200);
})

//Delete 
const getPublicIdFromUrl = (url) => {
    const regex = /upload\/(?:v\d+\/)?([^\.]+)/;
    const matchStatus = url.match(regex);
    return matchStatus ? matchStatus[1] : null;
};

router.delete("/bookData/:no", async (request, response) => {
    const no = +request.params.no;
    // const LoginUser = await Login.findOne();
    const bookData = await BookDetails.find({ 'no': no });
   
    //Delete image from Cloudinary 
    const publicId = getPublicIdFromUrl(bookData[0].image);

    cloudinary.v2.api
        .delete_resources([publicId],
            { type: 'upload', resource_type: 'image' })


    await BookDetails.deleteOne({ 'no': no }).then((res) => {
    });



    response.sendStatus(200);
})

module.exports = router;