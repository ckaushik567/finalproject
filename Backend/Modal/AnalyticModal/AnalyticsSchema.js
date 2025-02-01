const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
//   timestamp: {
//     type: Date,
//     default: Date.now,
//   },
timestamp:{
    type:String,
    required:true
},
  originalLink: {
    type: String,
    required: true,
  },
  shortLink: {
    type: String,
    // required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  userDevice: {
    type: String,
    required: true,
  },
  anotherDevice:{
    type:String,
    required:true
  }
});

const Analytics = mongoose.model("Analytics", analyticsSchema);

module.exports = Analytics;