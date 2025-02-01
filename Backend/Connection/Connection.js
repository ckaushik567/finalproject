const mongoose = require('mongoose');
require('dotenv').config();

const conn = mongoose.connect(process.env.MongoDB_Url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    conn.then(()=>{
        console.log('connected Succesfully');
    })
    .catch((err)=>{
        console.log(err)
    });

    module.exports = conn;