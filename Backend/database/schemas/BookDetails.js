const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    no: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    title: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    author: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    image: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    description: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    book_id: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    quantity: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    copies_issued: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default:0
    }
});

module.exports = mongoose.model('book_details', BookSchema);