const {Router} = require('express');
const studentData = require("./routes/studentData");
const StudentDetails = require("../database/schemas/StudentDetails")

const router = Router();

app.post("/image", uploader.single("file"), async (req, res) => {
    // console.log(req.file.path);
    // const upload = await cloudinary.v2.uploader.upload(req.file.path);
    // console.log(upload.secure_url);
    return res.send({
      success: true,
    //   file: upload.secure_url,
    })
});

module.exports = router;
