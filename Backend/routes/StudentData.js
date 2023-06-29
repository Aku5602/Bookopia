const express = require("express");
const { Router } = require('express');
const StudentDetails = require("../database/schemas/StudentDetails")
const cloudinary = require("../cloudinaryInfo/cloudinary");
const uploader = require("../cloudinaryInfo/multer");
const crypto = require("crypto");
const axios = require("axios");

const router = Router();

//Read
router.get("/studentData", async (request, response) => {
    // const LoginUser = await Login.findOne();
    const studentData = await StudentDetails.find({});
    response.send(JSON.stringify(studentData));
})

//Create
router.post("/studentData", uploader.single("file"), async (request, response) => {
    // const LoginUser = await Login.findOne();
    const obj = { ...request.body }
    const prevStud = await StudentDetails.find({}).sort({ 'id': -1 }).limit(1);
    let id = +prevStud[0].id + 1;
    if (id < 100) {
        id = "0" + id;
        // console.log(id);
    }
    else {
        id = "" + id;
        // console.log(id);
    }
    obj.id = id;
    obj.name = obj.fname + " " + obj.lname;

    const upload = await cloudinary.v2.uploader.upload(request.file.path);
    obj.profilePicture = upload.secure_url;
    // console.log(obj);
    const studentData = await StudentDetails.create(obj);
    // response.send("Hi"); 
    response.sendStatus(200);
})



//Update 

//Delete 
const getPublicIdFromUrl = (url) => {
    const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
    const matchStatus = url.match(regex);
    return matchStatus ? matchStatus[1] : null;
};

async function deleteImage (publicId) {
    return await cloudinary.uploader.destroy(
        publicId,
        { invalidate: true, resource_type: "image" },
        function (err, res) {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    ok: false,
                    menssage: "Error deleting file",
                    errors: err
                });
            }
            console.log(res);
        }
    );
}

router.delete("/studentData/:id", async (request, response) => {
    let id = request.params.id;
    if (id < 10) {
        id = "00" + id;
    }
    else if (id < 100) {
        id = "0" + id;
    }
    else {
        id = "" + id;
    }
    // console.log(id);
    // const LoginUser = await Login.findOne();
    const studentData = await StudentDetails.find({ 'id': id });

    //Delete image from Cloudinary
    const publicId = getPublicIdFromUrl(studentData[0].profilePicture);
    //  console.log("Public ID: ",publicId);
    deleteImage(publicId);
    // //Delete student details
    await StudentDetails.deleteOne({ 'id': id }).then((res) => {
        console.log(res);
    });



    response.sendStatus(200);
})






module.exports = router;