const mongoose = require('mongoose');
const shortId = require('shortid'); // Generates unique short IDs
const linkSchema = new mongoose.Schema({
    Date:{
        type:String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    URL: {
        type: String,
        require: true
    },
    shortId: {
        type: String,
        unique: true,
        default: shortId.generate // Automatically generate a short ID
    },
    Remarks:{
         type:String,
        required:true,
    },
    LinkExpiration:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        enum:["Active","Inactive"],
        default:"Active"
    },
    clicks:{
        type:Number,
        default:0
    }
})

const Link = new mongoose.model("Link", linkSchema);
module.exports  = Link;