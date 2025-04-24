const mongoose = require("mongoose")
const lumberSchema = mongoose.Schema({
    lumber_type: String,
    length: {
        type:Number,
        min: [4, 'Too short of a lumber'],
        max: [50, 'Too long of a lumber']
    },
    cost: Number
})

module.exports = mongoose.model("Lumber", lumberSchema)