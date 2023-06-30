const express = require("express");
const { Router } = require('express');
const StudentDetails = require("../database/schemas/StudentDetails");
const cloudinary = require("../cloudinaryInfo/cloudinary");
const uploader = require("../cloudinaryInfo/multer");


const router = Router();

//Read
router.get("/studentData", async (request, response) => {
    // const LoginUser = await Login.findOne();
    const studentData = await StudentDetails.find({}).sort({ 'id': +1 });
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

    const upload = await cloudinary.v2.uploader.upload(request.file.path, { folder: 'Students' });
    obj.profilePicture = upload.secure_url;

    const studentData = await StudentDetails.create(obj);

    response.sendStatus(200);
})

//Update [Not yet Tested and created]
router.put("/studentData", uploader.single("file"), async (request, response) => {
    // const LoginUser = await Login.findOne();
    const obj = { ...request.body }
    const prevStud = await StudentDetails.find({}).sort({ 'id': -1 }).limit(1);
    let id = +prevStud[0].id + 1;
    if (id < 100) {
        id = "0" + id;
    }
    else {
        id = "" + id;
    }
    obj.id = id;
    obj.name = obj.fname + " " + obj.lname;

    const upload = await cloudinary.v2.uploader.upload(request.file.path);
    obj.profilePicture = upload.secure_url;

    const studentData = await StudentDetails.create(obj);

    response.sendStatus(200);
})

//Delete 
const getPublicIdFromUrl = (url) => {
    const regex = /upload\/(?:v\d+\/)?([^\.]+)/;
    const matchStatus = url.match(regex);
    return matchStatus ? matchStatus[1] : null;
};

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

    const studentData = await StudentDetails.find({ 'id': id });

    const publicId = getPublicIdFromUrl(studentData[0].profilePicture);

    cloudinary.v2.api
        .delete_resources([publicId],
            { type: 'upload', resource_type: 'image' })
        .then(console.log);

    await StudentDetails.deleteOne({ 'id': id }).then((res) => {
        console.log(res);
    });



    response.sendStatus(200);
})






module.exports = router;