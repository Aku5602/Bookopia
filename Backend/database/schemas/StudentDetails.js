const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    name: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    mobile: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    profilePicture: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    quantity: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    returned: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    books_issued: {
        type: mongoose.SchemaTypes.Array,
        required: true,
        default:[]
    },
    dateOfIssue: {
        type: mongoose.SchemaTypes.Array,
        required: true,
        default:[]
    },
    createdAtDate: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date(),
    },
    createdAtTime: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: new Date().getTime(),
    }
});

module.exports = mongoose.model('student_details', StudentSchema);