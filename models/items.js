const mongoose = require('mongoose');
//Item Schema
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    item:{
        type: String,
        required: "Please enter an item."
    },
})

const Items = mongoose.model("Items", ItemSchema);

module.exports = Items;