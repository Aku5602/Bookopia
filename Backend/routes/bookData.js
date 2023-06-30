const express = require("express");
const { Router} = require('express');
//book schema
const BookDetails = require("../database/schemas/BookDetails")
const cloudinary = require("../cloudinaryInfo/cloudinary");
const uploader = require("../cloudinaryInfo/multer");

const router = Router();

//Read  [Not yet Tested and created]
router.get("/bookData", async (request, response) => {
    // const LoginUser = await Login.findOne();
    const bookData = await BookDetails.find({});
    response.send(JSON.stringify(bookData));
})

//Create or PUT  [Not yet Tested and created]
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

//Update  [Not yet Tested and created]
router.put("/bookData", async (request, response) => {
    // const LoginUser = await Login.findOne();
    const obj = { ...request.body }
    obj.no = +prevBook[0].no;
    obj.quantity = +obj.quantity;

    const bookData = await BookDetails.updateOne({'no':obj.no},obj);
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