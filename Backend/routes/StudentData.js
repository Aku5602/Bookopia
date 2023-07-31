const express = require("express");
const { Router } = require('express');
const StudentDetails = require("../database/schemas/StudentDetails");
const cloudinary = require("../cloudinaryInfo/cloudinary");
const uploader = require("../cloudinaryInfo/multer");
const BookDetails = require("../database/schemas/BookDetails")


const router = Router();

//Read
router.get("/studentData", async (request, response) => {
    // const LoginUser = await Login.findOne();
    const studentData = await StudentDetails.find({}).sort({ 'id': +1 });
    response.send(JSON.stringify(studentData));
})

router.get("/studentData/Available/:id", async (request, response) => {
    // const LoginUser = await Login.findOne();
    const id = request.params.id;
    const studentData = await StudentDetails.find({'books_issued.book_id':{$ne:id}}).sort({'id': 1});
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
    }
    else {
        id = "" + id;
    }
    obj.id = id;
    obj.name = obj.fname + " " + obj.lname;

    const upload = await cloudinary.v2.uploader.upload(request.file.path, { folder: 'Students' });
    obj.profilePicture = upload.secure_url;

    const studentData = await StudentDetails.create(obj);

    response.sendStatus(200);
})

//Update 
router.patch("/studentData", async (request, response) => {
    // const LoginUser = await Login.findOne();
    const obj = { ...request.body }
    const studentDataEditResponse = await StudentDetails.updateOne({ '_id':obj._id }, { $set: {[request.body.key]:request.body.value} });
    response.sendStatus(200);
})

router.patch("/studentData/BookInfo", async (request, response) => {
    // const LoginUser = await Login.findOne();
    const obj = { ...request.body }
    const obj1 = {};
    obj1.name = obj.name;
    obj1.id = obj.id;
    obj1.profilePicture = obj.profilePicture;
    // console.log(obj);
    // console.log(obj1);
    
    const studentDataEditResponse = await StudentDetails.updateOne({ '_id':obj._id }, { $push: {'books_issued':obj}} );
    // console.log(studentDataEditResponse);
    const removeBookQuantity = await BookDetails.updateOne({'book_id':obj.book_id,'no':obj.no,'quantity':{$gt:0}},{$inc:{'copies_issued':1,'quantity':-1},$push:{'students_info':obj1}});
    // console.log(removeBookQuantity);
    response.sendStatus(200); 
})

router.put("/studentData", async (request, response) => {
    // const LoginUser = await Login.findOne();
    const obj = { ...request.body }
    const studentDataEditResponse = await StudentDetails.replaceOne({ '_id': (obj._id) }, obj);
    // console.log(studentDataEditResponse);
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

    // console.log("id=",id)

    const studentData = await StudentDetails.find({ 'id': id });

    const publicId = getPublicIdFromUrl(studentData[0].profilePicture);

    cloudinary.v2.api
        .delete_resources([publicId],
            { type: 'upload', resource_type: 'image' });

        const arr = studentData[0].books_issued;
        // console.log(arr);
        

        for(let i=0;i<arr.length;i++) {
            const increaseQuantityResponse = await BookDetails.updateOne({'book_id':arr[i].book_id},{$inc:{'quantity':1,'copies_issued':-1},$pull:{"students_info":{'id':id}}});
            // console.log(arr.book_id," ",id," ",increaseQuantityResponse);
        }


    await StudentDetails.deleteOne({ 'id': id });


    response.sendStatus(200);
})

router.delete("/studentData/BookDelete/:_id/:book_id",async (request,response)=>{
    // console.log(request.params)
    const bookDeleteResponse = await StudentDetails.updateOne({'id': request.params._id},{"$pull":{"books_issued":{"book_id":request.params.book_id}}});
    // console.log(bookDeleteResponse);
    const increaseQuantityResponse = await BookDetails.updateOne({'book_id':request.params.book_id},{$inc:{'quantity':1,'copies_issued':-1},$pull:{"students_info":{'id':request.params._id}}});
    // console.log(increaseQuantityResponse);
    
    response.sendStatus(200);   
});





module.exports = router;