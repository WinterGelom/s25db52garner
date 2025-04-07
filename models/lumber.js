const mongoose = require("mongoose")
const lumberSchema = mongoose.Schema({
    lumber_type: String,
    length: Number,
    cost: Number
})

module.exports = mongoose.model("Lumber", lumberSchema)